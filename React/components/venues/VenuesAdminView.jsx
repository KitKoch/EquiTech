import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Table, InputGroup, Button, Form } from "react-bootstrap";
import { Search } from "react-feather";
import { venuesService } from "../../services/venuesService";
import toastr from "toastr";
import VenuesViewCard from "./VenuesViewCard";
import "rc-pagination/assets/index.css";
import Pagination from "rc-pagination";
import locale from "rc-pagination/lib/locale/en_US";

const _logger = logger.extend("VenuesSysAdmin");

const defaultData = {
  arrayOfVenues: [],
  venueComponents: [],
  currentPage: 1,
  pageSize: 7,
  totalCount: 0,
  query: "",
  searchedView: false,
};

function VenuesAdminView() {
  const [pageData, setPageData] = useState(defaultData);

  useEffect(() => {
    if (!pageData.searchedView) {
      fetchVenues();
    } else {
      venuesService
        .searchVenues(
          pageData.currentPage - 1,
          pageData.pageSize,
          pageData.query
        )
        .then(onSearchVenuesSuccess)
        .catch(onSearchVenuesError);
    }
  }, [pageData.currentPage]);

  const fetchVenues = () => {
    venuesService
      .getVenues(pageData.currentPage - 1, pageData.pageSize)
      .then(onGetVenuesSuccess)
      .catch(onGetVenuesError);
  };

  const onSubmitSearch = (e) => {
    e.preventDefault();
    _logger("Searching underway");
    venuesService
      .searchVenues(0, pageData.pageSize, pageData.query)
      .then(onSearchVenuesSuccess)
      .catch(onSearchVenuesError);
  };

  const onSearchVenuesSuccess = (response) => {
    _logger("Search success", response);
    const searchedVenuesArray = response.item.pagedItems;
    setPageData((prevState) => {
      const newState = { ...prevState };
      newState.arrayOfVenues = searchedVenuesArray;
      newState.venueComponents = searchedVenuesArray.map(mapVenueCard);
      newState.searchedView = true;
      newState.totalCount = response.item.totalCount;
      return newState;
    });
  };

  const onSearchVenuesError = (err) => {
    _logger("Search failed", err);
    toastr.warning("Unable to search");
  };

  const onGetVenuesSuccess = (response) => {
    _logger("Get Venues Success", response);
    const allVenues = response.item.pagedItems;
    const totalCount = response.item.totalCount;
    const paginationData = response.item;
    setPageData((prevState) => {
      const pd = { ...prevState };
      pd.arrayOfVenues = allVenues;
      pd.venueComponents = allVenues.map(mapVenueCard);
      pd.currentPage = paginationData.pageIndex + 1;
      pd.pageSize = paginationData.pageSize;
      pd.totalCount = totalCount;
      return pd;
    });
  };

  const searchOnChange = (event) => {
    const target = event.target;
    const inputValue = target.value;
    const nameOfField = target.name;
    setPageData((prevState) => {
      const newState = {
        ...prevState,
      };
      newState[nameOfField] = inputValue;
      return newState;
    });
  };

  const onChange = (page) => {
    setPageData((prevData) => {
      const pd = { ...prevData };
      pd.currentPage = page;
      return pd;
    });
  };

  const mapVenueCard = (venue) => {
    return (
      <VenuesViewCard
        venue={venue}
        key={`VenueCard-${venue.id}`}
        deleteVenue={deleteVenue}
      />
    );
  };

  const onGetVenuesError = (error) => {
    _logger(error);
    toastr.warning("Unable to fetch venues");
  };

  const navigate = useNavigate();

  const navigateToForm = () => {
    navigate(`/venues/add`);
  };

  const deleteVenue = (targetId) => {
    const handler = onDeleteVenueSuccess(targetId);
    venuesService.deleteVenue(targetId).then(handler).catch(onDeleteVenueError);
  };

  const onDeleteVenueSuccess = (response) => {
    _logger("Venue deleted", response);
    setPageData((prevState) => {
      const pd = { ...prevState };
      pd.arrayOfVenues = [...prevState.arrayOfVenues];
      const indxOf = pd.arrayOfVenues.findIndex((venue) => {
        let result = false;
        if (venue.id === response) {
          result = true;
        }
        return result;
      });
      if (indxOf > 0) {
        pd.arrayOfVenues.splice(indxOf, 1);
        pd.venueComponents = pd.arrayOfVenues.map(mapVenueCard);
      }
      return pd;
    });
    toastr.success("Venue sucessfully deleted");
  };

  const onDeleteVenueError = (err) => {
    _logger("Unable to delete venue", err);
    toastr.warning("Unable to delete venues");
  };

  const resetPage = () => {
    setPageData(defaultData);
    fetchVenues();
  };

  return (
    <Card>
      <Card.Header>
        <Card.Title>
          <div className="d-flex align-items-center justify-content-between">
            <h1>
              Venues{" "}
              <Button type="button" onClick={navigateToForm}>
                Add
              </Button>{" "}
              {pageData.searchedView && (
                <Button type="button" variant="info" onClick={resetPage}>
                  Reset
                </Button>
              )}
            </h1>
            <Form>
              <InputGroup>
                <Form.Control
                  type="text"
                  name="query"
                  value={pageData.query}
                  onChange={searchOnChange}
                  placeholder="Search Venue"
                />
                <InputGroup.Text>
                  <Button type="submit" variant="none" onClick={onSubmitSearch}>
                    <Search size={18} />
                  </Button>
                </InputGroup.Text>
              </InputGroup>
            </Form>
          </div>
        </Card.Title>
      </Card.Header>
      <Card.Body>
        <Table striped hover>
          <thead>
            <tr className="text-center">
              <th>Name</th>
              <th>Description</th>
              <th>Location</th>
              <th>Creator</th>
              <th>Modifier</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{pageData.venueComponents}</tbody>
        </Table>
        <Pagination
          className="mt-3 mb-3 text-center"
          onChange={onChange}
          pageSize={pageData.pageSize}
          current={pageData.currentPage}
          locale={locale}
          total={pageData.totalCount}
        />
      </Card.Body>
    </Card>
  );
}

export default VenuesAdminView;
