import React, { useState } from "react";
import { Modal, Nav, Tab, Form, Image, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import fairlyLogoWords from "../../assets/img/icons/fairlyBlackOnWhiteCropped.png";
import LogFormModal from "./LogFormModal";
import { useEffect } from "react";
import RegFormModal from "./RegFormModal";
import "./reglogmodal.css";

const _logger = logger.extend("RegLogModal");

function RegLogModal({ isShowingModal, setShowModal }) {
  const [activeTab, setActiveTab] = useState("login");

  useEffect(() => {
    _logger("RegLogModal is firing");
  }, []);

  const handleActiveTab = (tab) => {
    setActiveTab(tab);
  };

  return (
    <React.Fragment>
      <Modal
        show={isShowingModal}
        onHide={() => setShowModal(false)}
        centered
        backdrop="static"
        keyboard={false}
        className="p-2 rounded"
      >
        <Tab.Container activeKey={activeTab}>
          <Modal.Header className="bg-light p-0">
            <Nav
              variants="pills"
              defaultActiveKey="login"
              className="w-100 modal-chosen-tabs"
              activeKey={activeTab}
            >
              <Nav.Item className="col-6 text-center">
                <Nav.Link
                  eventKey="login"
                  active={activeTab === "login"}
                  className="p-3"
                  onClick={() => handleActiveTab("login")}
                >
                  <h3>LOGIN</h3>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item className="col-6 text-center">
                <Nav.Link
                  eventKey="register"
                  active={activeTab === "register"}
                  className="p-3"
                  onClick={() => handleActiveTab("register")}
                >
                  <h3>REGISTER</h3>
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Modal.Header>
          <Modal.Body>
            <Tab.Content>
              <Form.Group className="mb-1">
                <div className="text-center">
                  <Image src={fairlyLogoWords} />
                </div>
              </Form.Group>

              <Tab.Pane eventKey="login">
                <LogFormModal setShowModal={setShowModal} />
              </Tab.Pane>

              <Tab.Pane eventKey="register">
                <RegFormModal setShowModal={setShowModal} />
              </Tab.Pane>

              <Button
                type="button"
                className="col-12 rounded-pill py-2 mb-2 bg-danger"
                onClick={() => setShowModal(false)}
              >
                Close
              </Button>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
      </Modal>
    </React.Fragment>
  );
}

RegLogModal.propTypes = {
  isShowingModal: PropTypes.bool.isRequired,
  setShowModal: PropTypes.func.isRequired,
};

export default RegLogModal;
