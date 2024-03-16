import React, { useState, useEffect } from "react";
import { BiPlus } from "react-icons/bi";
import LicenseCard from "./LicenseCard";
import * as licenseService from "../../services/licenseService";
import toastr from "toastr";
import "rc-pagination/assets/index.css";
import Pagination from "rc-pagination";
import locale from "rc-pagination/lib/locale/en_US";
import { Card, Container, Table, Row } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
const _logger = debug.extend("LicensesList");
import PropTypes from "prop-types";

//#region LICENSES CORE
function LicensesList({ currentUser }) {
  const [pageData, setPageData] = useState({
    arrayOfLicenses: [],
    licensesComponentArray: [],
    totalCount: 0,
    pageIndex: 0,
    pageSize: 6,
    userRoles: [],
  });

  _logger("PAGEDATA", pageData);

  const navigate = useNavigate();
  const addLicenseButton = () => {
    navigate("/licenses/add");
  };

  useEffect(() => {
    getLicensesList(pageData.pageIndex, pageData.pageSize);
  }, [pageData.pageIndex]);

  const pgChange = (page) => {
    setPageData((prevState) => {
      let newPgData = { ...prevState };
      newPgData.pageIndex = page - 1;
      return newPgData;
    });
  };

  function getLicensesList(pgSize, pgIndex) {
    licenseService
      .selectAllLicenses(pgSize, pgIndex)
      .then(onGetLicensesSuccess)
      .catch(onGetLicensesError);
  }

  function onGetLicensesSuccess(response) {
    let responseArray = response.item.pagedItems;
    _logger("licensesArraySuccess: ", responseArray);
    setPageData((prevState) => {
      let newPageData = { ...prevState };
      newPageData.totalCount = response.item.totalCount;
      newPageData.arrayOfLicenses = responseArray;
      newPageData.licensesComponentArray = responseArray.map(licenseMapper);
      return newPageData;
    });
  }

  function onGetLicensesError(error) {
    toastr.error("No Licenses Found.", error);
  }

  const handleDelete = (indexToDelete) => {
    setPageData((prevData) => {
      const newData = { ...prevData };
      const tempArray = [...prevData.arrayOfLicenses];
      tempArray.splice(indexToDelete, 1);
      newData.arrayOfLicenses = tempArray;
      newData.licensesComponentArray = tempArray.map(licenseMapper);
      return newData;
    });
  };

  function licenseMapper(license, index) {
    return (
      <LicenseCard
        key={`license_${license.id}`}
        licData={license}
        onDelete={handleDelete}
        index={index}
        onUpdateVerification={updateLicenseVerificationStatus}
        currentUser={currentUser}
      />
    );
  }

  const updateLicenseVerificationStatus = (updatedLicense) => {
    setPageData((prevState) => {
      const updatedArray = prevState.arrayOfLicenses.map((license) => {
        if (license.id === updatedLicense.id) {
          return updatedLicense;
        }
        return license;
      });

      const updatedComponentArray = updatedArray.map(licenseMapper);

      return {
        ...prevState,
        arrayOfLicenses: updatedArray,
        licensesComponentArray: updatedComponentArray,
      };
    });
  };

  return (
    <>
      <Helmet title="Licenses" />
      <Container>
        <Card>
          <Card.Header>
            <Card.Title>Licenses</Card.Title>
          </Card.Header>
          <Table>
            <thead>
              <tr>
                <th className="w-5">License Name</th>
                <th className="w-5">License Number</th>
                <th className="w-8">State Issued</th>
                <th className="w-5">Expiration Date</th>
                <th className="w-5">Status</th>
                <th className="w-5">Verification</th>
                <th className="w-5">
                  <BiPlus
                    title="Add License"
                    cursor="pointer"
                    size={25}
                    className="iconsize"
                    onClick={addLicenseButton}
                  ></BiPlus>
                </th>
              </tr>
            </thead>
            {pageData.arrayOfLicenses.length > 0 ? (
              <tbody>{pageData.licensesComponentArray}</tbody>
            ) : (
              <tbody>
                <tr>
                  <td className="w-2">No Licenses Found</td>
                </tr>
              </tbody>
            )}
          </Table>
          <Row className="mx-auto justify-content-center p-2">
            <Pagination
              onChange={pgChange}
              pageSize={pageData.pageSize}
              current={pageData.pageIndex + 1}
              total={pageData.totalCount}
              locale={locale}
            />
          </Row>
        </Card>
      </Container>
    </>
  );
}

LicensesList.propTypes = {
  currentUser: PropTypes.shape({}),
};

export default LicensesList;
