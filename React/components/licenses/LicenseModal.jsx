import React from "react";
import { Button, Modal } from "react-bootstrap";
import * as licenseService from "../../services/licenseService";
import Swal from "sweetalert2";
import propTypes from "prop-types";

const _logger = debug.extend("LicensesModal");

const LicenseModal = ({
  onHide,
  licenseData,
  onVerifyLicense,
  currentUser,
}) => {
  const getFileComponent = () => {
    const fileType = licenseData.file.fileType.name;
    const fileUrl = licenseData.file.url;

    if (fileType === "pdf") {
      return (
        <>
          <embed
            src={fileUrl}
            type="application/pdf"
            width="100%"
            height="500px"
          />
        </>
      );
    } else if (["png", "jpeg", "jpg", "webp", "svg"].includes(fileType)) {
      return <img src={fileUrl} alt="File" style={{ maxWidth: "100%" }} />;
    } else {
      return <p>No preview available for this file type.</p>;
    }
  };

  const handleVerifyLicense = () => {
    const updatedLicenseData = {
      ...licenseData,
      fileId: licenseData.file.id,
      dateVerified: new Date().toISOString(),
    };

    licenseService
      .updateLicense(updatedLicenseData)
      .then(handleVerifySuccess)
      .catch(handleVerifyError);
  };

  const handleVerifySuccess = (updatedLicenseData) => {
    onVerifyLicense(updatedLicenseData);
    Swal.fire("Success!", "License verified!", "success");
    onHide();
  };

  const handleVerifyError = (error) => {
    _logger("Error verifying license:", error);
    Swal.fire({
      title: "Error",
      text: "Failed to verify the license. Please try again.",
      icon: "error",
      confirmButtonText: "OK",
    });
  };

  return (
    <Modal show={true} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{licenseData.licenseName}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center m-3">{getFileComponent()}</Modal.Body>
      <Modal.Footer>
        {currentUser.roles.includes("SysAdmin") && (
          <Button variant="primary" onClick={handleVerifyLicense}>
            Verify License
          </Button>
        )}
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

LicenseModal.propTypes = {
  onHide: propTypes.func.isRequired,
  licenseData: propTypes.shape({
    licenseName: propTypes.string.isRequired,
    file: propTypes.shape({
      id: propTypes.number,
      url: propTypes.string.isRequired,
      fileType: propTypes.shape({
        name: propTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
  onVerifyLicense: propTypes.func,
  currentUser: propTypes.shape({
    roles: propTypes.arrayOf(propTypes.string),
  }),
};

export default LicenseModal;
