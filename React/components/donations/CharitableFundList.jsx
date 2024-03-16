import React, { useState } from "react";
import { Card, Row, Table, Col, Button } from "react-bootstrap";
import { useEffect } from "react";
import CharitableFundListItem from "./CharitableFundListItem";
import "rc-pagination/assets/index.css";
import Pagination from "rc-pagination";
import locale from "rc-pagination/lib/locale/en_US";
import { useNavigate } from "react-router-dom";
import charitableFundService from "../../services/charitableFundService";
import Swal from "sweetalert2";

function CharitableFundList() {
  const navigate = useNavigate();
  const [pageData, setPageData] = useState({
    size: 10,
    currentPage: 1,
    charitableFund: [],
    charitableFundComponent: [],
  });

  useEffect(() => {
    charitableFundService
      .getCharitableFund(pageData.currentPage - 1, pageData.size)
      .then(onGetSuccess)
      .catch(onGetError);
  }, [pageData.currentPage]);

  const onGetSuccess = (response) => {
    let funds = response.item.pagedItems;
    setPageData((prevState) => {
      let update = { ...prevState };
      update.total = response.item.totalCount;
      update.charitableFund = funds;
      update.charitableFundComponent = funds.map(mapFiles);
      return update;
    }, []);
  };

  const onGetError = () => {
    toastr.error("There was an Error");
  };

  const mapFiles = (charitable) => {
    return (
      <CharitableFundListItem
        key={charitable.id}
        charitableFund={charitable}
        fundEdit={onEditClicked}
        fundDelete={onDeleteClicked}
      />
    );
  };

  const onEditClicked = (charitableFund) => {
    navigate("/donation/charitablefund/form", {
      state: {
        type: "CHARITABLEFUND_UPDATE",
        payload: {
          id: charitableFund.id,
          name: charitableFund.name,
          description: charitableFund.description,
          url: charitableFund.url,
        },
      },
    });
  };

  const onDeleteClicked = (charitableFund) => {
    const onDeleteTrue = (response) => {
      let payload = { id: charitableFund.id, isDeleted: true };
      if (response.isConfirmed) {
        let handle = onDeleteSuccess(charitableFund);
        charitableFundService
          .deleteCharitableFund(payload)
          .then(handle)
          .catch(onDeleteError);
      }
    };
    Swal.fire({
      icon: "question",
      title: "Are you sure want to Delete",
      text: `${charitableFund.name}?`,
      showCancelButton: true,
      confirmButtonText: "Delete",
    }).then(onDeleteTrue);
  };

  const onDeleteSuccess = (charitableFund) => {
    fundDeleted(charitableFund.id);
    Swal.fire("Success", "Charitable Fund Deleted", "success");
  };

  const onDeleteError = () => {
    Swal.fire("Something went Wrong", "Please Try Again", "error");
  };

  const fundDeleted = (id) => {
    const checkIndex = (item) => {
      return item.id === id;
    };
    setPageData((prevState) => {
      let update = { ...prevState };
      const index = prevState.charitableFund.findIndex(checkIndex);
      update.charitableFund.splice(index, 1);
      update.charitableFundComponent = update.charitableFund.map(mapFiles);
      return update;
    }, []);
  };

  const onPaginateChange = (page) => {
    setPageData((prevState) => {
      let pd = { ...prevState };
      pd.currentPage = page;
      return pd;
    });
  };

  const onCreateFundClicked = () => {
    navigate("/donation/charitablefund/form");
  };

  return (
    <React.Fragment>
      <Row>
        <Col>
          <Card md={8}>
            <Row>
              <Col className="card-header">
                <h4 className="mb-0">Charitable Funds</h4>
              </Col>
              <Col className="d-flex justify-content-end align-items-center">
                <Button
                  variant="success"
                  type="button"
                  onClick={onCreateFundClicked}
                  className="m-2"
                >
                  Create New Fund
                </Button>
              </Col>
            </Row>
            <Card.Body className="p-0">
              <div className="table-responsive border-0 overflow-y-hidden">
                <Table className="text-nowrap table table-hover">
                  <thead className="table-light">
                    <tr role="row">
                      <th></th>
                      <th colSpan="1" role="columnheader">
                        Name
                      </th>
                      <th colSpan="1" role="columnheader">
                        Description
                      </th>
                      <th colSpan="1" role="columnheader">
                        Website
                      </th>
                      <th colSpan="1" role="columnheader">
                        Date Created
                      </th>
                      <th colSpan="1" role="columnheader"></th>
                    </tr>
                  </thead>
                  <tbody role="rowgroup">
                    {pageData.charitableFundComponent}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
            <div className="mx-auto">
              <Pagination
                defaultPageSize={pageData.size}
                total={pageData.total}
                current={pageData.currentPage}
                onChange={onPaginateChange}
                className="m-2"
                locale={locale}
              />
            </div>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
}
export default CharitableFundList;
