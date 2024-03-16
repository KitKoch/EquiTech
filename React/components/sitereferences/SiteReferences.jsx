import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import { Button, Card, Modal } from "react-bootstrap";
import toastr from "toastr";
import logo from "../../assets/img/fireworks.png";
import SiteRefServices from "../../services/siteReferenceService";
import Swal from "sweetalert2";

function SiteReference() {
  const [show, setShow] = useState(true);
  const handleToggle = () => setShow(!show ? true : false);
  const _logger = debug.extend("sitereference");
  const [userInfo, setUserInfo] = useState({
    userId: 0,
  });
  const [reqOption, setReqOption] = useState({
    options: [
      { id: 1, name: "Facebook" },
      { id: 2, name: "Instagram" },
      { id: 3, name: "Twitter" },
      { id: 4, name: "Google" },
      { id: 5, name: "Podcast" },
      { id: 6, name: "Television" },
      { id: 7, name: "Radio" },
      { id: 8, name: "Word of Mouth" },
    ],
  });
  const { state } = useLocation();
  useEffect(() => {
    if (state?.type === "new") {
      setUserInfo((prevState) => {
        const newSt = { ...prevState };
        newSt.userId = state.payload.item;
        return newSt;
      });
    }
  }, []);
  useEffect(() => {
    setReqOption((prevState) => {
      const pv = { ...prevState };
      pv.optionComponents = pv.options.map(mapOption);
      return pv;
    });
  }, []);
  const mapOption = (option) => {
    return (
      <option value={option.id} key={option.id}>
        {option.name}
      </option>
    );
  };
  const onSubmitForm = (values) => {
    let dataforservice = { ...values };
    SiteRefServices.addReference(dataforservice.select, userInfo.userId)
      .then(onPostSuccess)
      .catch(onPostError);
  };
  const navigate = useNavigate();
  const onPostSuccess = (response) => {
    _logger(response);
    Swal.fire({
      icon: "success",
      title: "Thank you!",
    }).then(navigate(`/`));
  };
  const onPostError = (response) => {
    _logger(response);
    toastr.error("Something went wrong");
  };
  _logger(reqOption.optionComponents);
  return (
    <Card>
      <Card.Header>
        <img src={logo} alt="fairly logo" />
      </Card.Header>
      <Card.Body className="text-center">
        <p>If dialog box does not appear click below</p>
        <React.Fragment>
          <Button show={show} onClick={handleToggle} className="me-1">
            How did you hear about us?
          </Button>
          <Modal show={show}>
            <Modal.Header>How did you hear about us?</Modal.Header>
            <Formik
              enableReinitialize={true}
              onSubmit={onSubmitForm}
              initialValues={{ select: "" }}
            >
              <Form id="refType">
                <Modal.Body className="text-center m-3">
                  <div className="form-group">
                    <Field
                      component="select"
                      type="option"
                      name="select"
                      className="form-control"
                    >
                      <option value={0}>Please choose an option</option>
                      {reqOption.optionComponents}
                    </Field>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <Button show={show} onClick={handleToggle}>
                    Close
                  </Button>
                  <Button type="submit" form="refType">
                    Submit
                  </Button>
                </Modal.Footer>
              </Form>
            </Formik>
          </Modal>
        </React.Fragment>
      </Card.Body>
    </Card>
  );
}

export default SiteReference;
