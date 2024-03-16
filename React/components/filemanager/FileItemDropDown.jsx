import React from "react";
import propTypes from "prop-types";
import { HiDownload } from "react-icons/hi";
import { AiOutlineLink } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";
import styles from "./FileManager.module.css";

const FileItemDropDown = ({ className, onDelete, onDownload, onCopy }) => {
  return (
    <div className={`${className} absolute shadow rounded bg-white `}>
      <div
        className={`px-3 p-2 ${styles.filemanager_option}`}
        onClick={onDownload}
      >
        <HiDownload size={28} className="me-2" /> Download
      </div>
      <div className={`px-3 p-2 ${styles.filemanager_option}`} onClick={onCopy}>
        <AiOutlineLink size={28} className="me-2" />
        Copy Link
      </div>
      <div
        className={`px-3 p-2 ${styles.filemanager_option}`}
        onClick={onDelete}
      >
        <MdDeleteOutline size={28} className="me-2" />
        Delete
      </div>
    </div>
  );
};

FileItemDropDown.propTypes = {
  className: propTypes.string,
  onDelete: propTypes.string.isRequired,
  onDownload: propTypes.string.isRequired,
  onCopy: propTypes.string.isRequired,
};

export default FileItemDropDown;
