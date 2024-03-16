import React, { useEffect, useState } from "react";
import { Formik, Form as FormikForm, Field, ErrorMessage } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import { Form, Card, Col, Row, Button } from "react-bootstrap";
import venueSchema from "../../schemas/venueSchema";
import { venuesService } from "../../services/venuesService";
import locationServices from "../../services/locationService";
import { Container } from "react-bootstrap";
import PropTypes from "prop-types";
import Select from "react-select";
import Swal from "sweetalert2";
import toastr from "toastr";

const _logger = logger.extend("VenueForm");
const defaultOption = { value: 0, label: "Select A Location" };
function VenueForm() {
  const [initialValues, setInitalValues] = useState({
    id: "",
    name: "",
    description: "",
    locationId: 0,
    location: defaultOption,
    url: "",
  });

  const venue = useLocation();
  const navigate = useNavigate();

  const [locOptions, setLocOptions] = useState([]);

  const mapLocations = (location) => {
    return {
      value: location.id,
      label: `${location.lineOne} ${location.lineTwo}, ${location.city}, ${location.state.col3} ${location.zip}`,
    };
  };

  useEffect(() => {
    locationServices.getAll().then(onLookUpSuccess).catch(onLookUpError);
  }, []);

  const onLookUpSuccess = (response) => {
    _logger("Get Location By ID Success", response);
    const locations = response?.data?.items;
    const options = locations.map(mapLocations);
    setLocOptions(options);
    if (venue.state?.payload) {
      updateState(locations);
    }
  };

  const updateState = (locations) => {
    const editRequestVenue = venue.state.payload;
    const findLoc = locations.find((item) => {
      return item.id === editRequestVenue.location.id;
    });
    setInitalValues((prevState) => {
      const newState = { ...prevState };
      newState.locationId = editRequestVenue.location.id;
      newState.location = {
        value: findLoc.id,
        label: `${findLoc.lineOne} ${findLoc.lineTwo}, ${findLoc.city}, ${findLoc.state.col3} ${findLoc.zip}`,
      };
      newState.id = editRequestVenue.id;
      newState.name = editRequestVenue.name;
      newState.description = editRequestVenue.description;
      newState.url = editRequestVenue.url;
      return newState;
    });
  };

  const onLookUpError = (err) => {
    _logger("Get Location By ID Error", err);
    toastr.warning("Unable to fetch locations");
  };

  const returnToMain = () => {
    navigate(`/venues/admin`);
  };

  const onSubmit = (values) => {
    _logger(values, "values before submit");
    if (!initialValues.id) {
      venuesService
        .addVenue(values)
        .then(onAddVenueSuccess)
        .catch(onAddVenueError);
    } else if (initialValues.id) {
      venuesService
        .updateVenue(values, initialValues.id)
        .then(onUpdateVenueSuccess)
        .catch(onUpdateVenueError);
    }
  };

  const onSelectChange = (option, source, setFieldValue) => {
    _logger(
      "onSelectChange",
      "option:",
      option,
      "option.value:",
      option.value,
      "source.name",
      source.name
    );
    setFieldValue(source.name, option);
    setFieldValue("locationId", option.value);
  };

  const onAddVenueSuccess = (response) => {
    _logger("Venue Added", response);
    Swal.fire({
      icon: "success",
      title: "Venue successfully added",
    }).then(returnToMain);
  };

  const onAddVenueError = (err) => {
    _logger("Venue Added Error", err);
    Swal.fire({
      icon: "error",
      title: "Unable to add venue, please try again",
      confirmButtonText: "Try Again",
    });
  };

  const onUpdateVenueSuccess = (response) => {
    _logger("Venue Updated", response);
    Swal.fire({
      icon: "success",
      title: "Venue successfully updated",
    }).then(returnToMain);
  };

  const onUpdateVenueError = (err) => {
    _logger("Venue Updated Error", err);
    Swal.fire({
      icon: "error",
      title: "Unable to edit venue, please try again",
      confirmButtonText: "Try Again",
    });
  };

  return (
    <Container>
      <Row className="d-flex justify-content-center">
        <Col sm={12}>
          <Formik
            enableReinitialize={true}
            validationSchema={venueSchema.venueFormSchema}
            onSubmit={onSubmit}
            initialValues={initialValues}
          >
            {({ setFieldValue, values }) => (
              <FormikForm>
                <Card>
                  <Card.Header>
                    <Card.Title className="text-center">
                      <h1>
                        {venue?.state?.payload &&
                        venue?.state?.type === "VENUE_EDIT"
                          ? "Venue Update Form"
                          : "Venue Add Form"}
                      </h1>
                    </Card.Title>
                  </Card.Header>
                  <Card.Body>
                    <Form.Group as={Row} className="mb-3">
                      <Form.Label column sm={2} className="text-sm-right">
                        Name
                      </Form.Label>
                      <Col sm={10}>
                        <Field
                          type="text"
                          name="name"
                          placeholder="Name"
                          className="form-control"
                        />
                        <ErrorMessage
                          name="name"
                          component="div"
                          className="text-danger"
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                      <Form.Label column sm={2} className="text-sm-right">
                        URL
                      </Form.Label>
                      <Col sm={10}>
                        <Field
                          type="text"
                          name="url"
                          placeholder="URL"
                          className="form-control"
                        />
                        <ErrorMessage
                          name="url"
                          component="div"
                          className="text-danger"
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                      <Form.Label column sm={2} className="text-sm-right">
                        Description
                      </Form.Label>
                      <Col sm={10}>
                        <Field
                          as="textarea"
                          name="description"
                          placeholder="Description"
                          className="form-control"
                          rows="3"
                        />
                        <ErrorMessage
                          name="description"
                          component="div"
                          className="text-danger"
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                      <Form.Label column sm={2} className="text-sm-right">
                        Location
                      </Form.Label>
                      <Col sm={10}>
                        <Select
                          name="location"
                          className="form-control"
                          virtualized={true}
                          maxMenuHeight={110}
                          value={values?.location || 0}
                          onChange={(option, source) =>
                            onSelectChange(option, source, setFieldValue)
                          }
                          options={locOptions}
                        />
                        <ErrorMessage
                          name="locationId"
                          component="div"
                          className="text-danger"
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                      <Col sm={{ size: 10, offset: 2 }}>
                        <Button variant="primary" type="submit">
                          Submit
                        </Button>
                        <Button
                          className="ms-2"
                          variant="danger"
                          type="button"
                          onClick={returnToMain}
                        >
                          Cancel
                        </Button>
                      </Col>
                    </Form.Group>
                  </Card.Body>
                </Card>
              </FormikForm>
            )}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
}

VenueForm.propTypes = {
  currentUser: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
};

export default VenueForm;
