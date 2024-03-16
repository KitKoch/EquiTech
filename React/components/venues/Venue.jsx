import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import VenuesCard from "./VenuesCard";
import Pagination from "rc-pagination";
import locale from "rc-pagination/lib/locale/en_US";
import "rc-pagination/assets/index.css";
import { venuesService } from "../../services/venuesService";
import toastr from "toastr";

const Venues = () => {
  const _logger = debug.extend("Venues");
  const [pageData, setPageData] = useState({
    arrayOfVenues: [],
    venuesComponent: [],
    currentPage: 1,
    pageSize: 3,
    totalCount: 0,
  });

  useEffect(() => {
    venuesService
      .getVenues(pageData.currentPage - 1, pageData.pageSize)
      .then(onGetVenuesSucess)
      .catch(onGetVenuesError);
  }, [pageData.currentPage]);

  const onGetVenuesSucess = (response) => {
    _logger("firing:", response);
    let venueArray = response.item.pagedItems;
    let paginationData = response.item;

    setPageData((prevState) => {
      const pd = { ...prevState };
      pd.arrayOfVenues = venueArray;
      pd.venuesComponent = venueArray.map(mapVenue);
      pd.currentPage = paginationData.pageIndex + 1;
      pd.pageSize = paginationData.pageSize;
      pd.totalCount = paginationData.totalCount;
      return pd;
    });
  };

  const mapVenue = (aVenue) => {
    return <VenuesCard venueCard={aVenue} key={"VenueCard-" + aVenue.id} />;
  };

  const onChange = (page) => {
    setPageData((prevData) => {
      const pd = { ...prevData };
      pd.currentPage = page;
      return pd;
    });
  };

  const onGetVenuesError = (err) => {
    _logger(err);
    toastr.warning("Unable to fetch venues");
  };

  return (
    <Container>
      <Row className="justify-content-between">
        <Col lg={4}>
          <Pagination
            className="mt-3 mb-3 text-center"
            onChange={onChange}
            pageSize={pageData.pageSize}
            current={pageData.currentPage}
            locale={locale}
            total={pageData.totalCount}
          />
        </Col>
      </Row>
      <Row>{pageData.venuesComponent}</Row>
    </Container>
  );
};

export default Venues;
