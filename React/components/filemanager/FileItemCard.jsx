import React, { useState } from "react";
import { IoCheckboxSharp } from "react-icons/io5";
import { CiFileOn } from "react-icons/ci";
import { BsThreeDotsVertical } from "react-icons/bs";
import FileItemDropDown from "./FileItemDropDown";
import { Card } from "react-bootstrap";
import propTypes from "prop-types";
import useOnclickOutside from "react-cool-onclickoutside";
import { HiOutlineArrowPathRoundedSquare } from "react-icons/hi2";

const FileItemCard = ({
  file,
  setSelectedFiles,
  selectedFiles,
  handleDelete,
  handleCopy,
  handleDownload,
  isShowAllDeleted,
  handleRecover,
}) => {
  const images = new Set([".png", "jpeg", ".jpg", ".gif", "webp", ".svg"]);
  const thumbNail = images.has(file.url.slice(-4));
  const selected = selectedFiles.includes(file.id);
  const [showDropDown, setShowDropDown] = useState(false);
  const [isFullName, setIsFullName] = useState(false);

  const dropDownRef = useOnclickOutside(() => {
    setShowDropDown(false);
  });

  const noPreview = (
    <div className="relative">
      <CiFileOn size={40} className="d-block mx-auto fs-4" />
      <p className="absolute"></p>
      <div>No preview available</div>
    </div>
  );

  const handleClick = (file) => {
    if (!selectedFiles.includes(file)) {
      setSelectedFiles((prev) => {
        return [...prev, file];
      });
    } else {
      setSelectedFiles((prev) => {
        return [...prev].filter((id) => id !== file);
      });
    }
  };

  const toggleDropdown = () => {
    setShowDropDown((prev) => {
      return !prev;
    });
  };

  const onDelete = () => {
    handleDelete(file);
    setShowDropDown(false);
  };
  const onCopy = () => {
    handleCopy(file);
    setShowDropDown(false);
  };
  const onDownload = () => {
    handleDownload(file);
    setShowDropDown(false);
  };

  const showFullName = () => {
    setIsFullName(true);
  };
  const hideFullName = () => {
    setIsFullName(false);
  };

  return (
    <Card className={`col position-relative`}>
      {isFullName && (
        <div className="bg-white shadow position-absolute rounded mt-4 z-20 w-100 p-1">
          {file.name}
        </div>
      )}
      <div
        className={`ratio ratio-1x1 rounded  ${
          selected ? "bg-secondary" : "bg-light"
        }`}
      >
        <div className="p-2 d-flex flex-column shadow">
          <header className="d-flex align-items-center mb-2 position-relative">
            {selected && (
              <IoCheckboxSharp
                size={18}
                className="text-white bg-secondary me-2 fw-bolder"
              />
            )}
            <h4
              className={`fs-5 text-truncate w-75 my-0 ${
                selected && "text-light"
              }`}
              onMouseOver={showFullName}
              onMouseOut={hideFullName}
            >
              {file.name}
            </h4>
            {!selected &&
              (isShowAllDeleted ? (
                <div className="position-absolute end-0">
                  <HiOutlineArrowPathRoundedSquare
                    onClick={() => handleRecover(file.id)}
                    className="text-success"
                  />
                </div>
              ) : (
                <>
                  <BsThreeDotsVertical
                    size={18}
                    role="button"
                    onClick={toggleDropdown}
                    className="position-absolute end-0"
                  />
                  {showDropDown && (
                    <div ref={dropDownRef}>
                      <FileItemDropDown
                        className="position-absolute end-0 mt-3"
                        onDelete={onDelete}
                        onCopy={onCopy}
                        onDownload={onDownload}
                      />
                    </div>
                  )}
                </>
              ))}
          </header>
          <div
            onClick={() => handleClick(file.id)}
            role="button"
            className="flex-grow bg-white h-100 d-flex align-items-center justify-content-center overflow-hidden"
          >
            {thumbNail ? (
              <img src={file.url} className="img-thumbnail " />
            ) : (
              noPreview
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

FileItemCard.propTypes = {
  setSelectedFiles: propTypes.func.isRequired,
  selectedFiles: propTypes.arrayOf(propTypes.number).isRequired,
  file: propTypes.shape({
    id: propTypes.number,
    url: propTypes.string,
    name: propTypes.string,
  }).isRequired,
  handleDelete: propTypes.func.isRequired,
  handleCopy: propTypes.func.isRequired,
  handleDownload: propTypes.func.isRequired,
  isShowAllDeleted: propTypes.func.isShowAllDeleted,
  handleRecover: propTypes.func.isRequired,
};

export default FileItemCard;
