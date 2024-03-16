import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Badge } from "react-bootstrap";
import propTypes from "prop-types";
import Swal from "sweetalert2";
import * as licenseService from "../../services/licenseService";
import { BiEdit, BiFileBlank, BiTrash } from "react-icons/bi";
import LicenseModal from "./LicenseModal";
const _logger = debug.extend("LicensesList");

export default function LicenseCard(props) {
  const [showModal, setShowModal] = useState(false);
  const [cardData, setCardData] = useState(props.licData);
  const navigate = useNavigate();
  _logger("cardData: ", cardData);
  const todaysDate = new Date();
  const expirationDate = new Date(cardData.expirationDate);

  const openModal = () => {
    setShowModal(true);
  };

  function toUpdateForm() {
    navigate(`/licenses/${cardData.id}/edit`, { state: cardData });
  }

  function tryDeleteLicense() {
    Swal.fire({
      title: "Warning: Please confirm you want to delete this license.",
      icon: "warning",
      confirmButtonText: "Confirm",
      cancelButtonText: "Cancel",
      iconColor: "red",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        licenseService
          .deleteLicense(cardData.id)
          .then(deleteSuccess)
          .catch(deleteError);
      }
    });
  }

  function deleteSuccess() {
    _logger("Delete successful");
    Swal.fire({
      title: "License has been deleted",
      icon: "success",
      confirmButtonText: "OK",
    }).then(() => {
      if (props.onDelete) {
        props.onDelete(props.index);
      }
    });
  }

  function deleteError(err) {
    toastr.error("Something went wrong. Please try again.");
    _logger("Delete Error response: ", err);
  }

  const handleVerifyLicense = () => {
    const updatedLicenseData = {
      ...cardData,
      dateVerified: new Date().toISOString(),
    };

    setCardData(updatedLicenseData);
  };

  return (
    <>
      <tr>
        <td className="w-5">{cardData.licenseName}</td>
        <td className="w-5">{cardData.licenseNumber}</td>
        <td className="w-8">{cardData.stateName}</td>
        <td className="w-5">{cardData.expirationDate.slice(0, 10)}</td>
        {expirationDate > todaysDate ? (
          <td className="w-5">
            <Badge bg="success">Active</Badge>
          </td>
        ) : (
          <td className="w-5">
            <Badge bg="danger">
              <i>Expired</i>
            </Badge>
          </td>
        )}
        {cardData.dateVerified !== "0001-01-01T00:00:00" ? (
          <td className="w-5">
            <Badge bg="primary">Verified</Badge>
          </td>
        ) : (
          <td className="w-5">
            <Badge bg="secondary">
              <i>Awaiting Verification...</i>
            </Badge>
          </td>
        )}
        <td className="w-5">
          <BiFileBlank
            title="View License"
            cursor="pointer"
            size={25}
            onClick={openModal}
          />
          <BiEdit
            title="Edit License"
            cursor="pointer"
            size={25}
            onClick={toUpdateForm}
          />
          <BiTrash
            title="Delete License"
            cursor="pointer"
            size={25}
            onClick={tryDeleteLicense}
          />
        </td>
      </tr>
      {showModal && (
        <LicenseModal
          onHide={() => setShowModal(false)}
          licenseData={cardData}
          onVerifyLicense={handleVerifyLicense}
          currentUser={props.currentUser}
        />
      )}
    </>
  );
}

LicenseCard.propTypes = {
  licData: propTypes.shape({
    dateVerified: propTypes.string.isRequired,
    id: propTypes.number.isRequired,
    licenseStateId: propTypes.number.isRequired,
    stateName: propTypes.string.isRequired,
    licenseNumber: propTypes.string.isRequired,
    licenseName: propTypes.string.isRequired,
    isActive: propTypes.bool.isRequired,
    expirationDate: propTypes.string.isRequired,
    createdBy: propTypes.shape({
      id: propTypes.number.isRequired,
      firstName: propTypes.string.isRequired,
      lastName: propTypes.string.isRequired,
      mi: propTypes.string,
      avatarUrl: propTypes.string,
    }).isRequired,
  }).isRequired,
  onDelete: propTypes.func.isRequired,
  index: propTypes.number.isRequired,
  currentUser: propTypes.shape({}),
};
