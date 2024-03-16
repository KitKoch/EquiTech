import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { AiOutlineFile } from "react-icons/ai";
import Swal from "sweetalert2";
import file from "../../assets/img/icons/file.png";
import styles from "./LicenseUploadWidget.module.css";
import Spinner from "react-bootstrap/Spinner";
import { uploadFiles } from "../../services/fileService";
import propTypes from "prop-types";
import { MdNoPhotography } from "react-icons/md";
import { Card } from "react-bootstrap";

const getFileSize = (size) => {
  const prefix = ["b", "kb", "mb", "gb"];
  let index = 0;
  while (size > 1024) {
    size /= 1024;
    index += 1;
  }
  return `${Math.round(size)}${prefix[index]}`;
};

const LicenseUploadWidget = ({
  handleFileChange,
  isThumbnail = false,
  isFileList = false,
  isAlertPopUp = false,
  className,
}) => {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const _logger = debug.extend("Files");

  const acceptedFiles = {
    image: new Set(["png", "jpeg", "jpg", "webp", "svg"]),
    nonImage: new Set(["pdf"]),
  };
  const onSuccess = (res) => {
    if (res?.items?.length > 0) {
      _logger("file upload response", res.items);
      isAlertPopUp &&
        Swal.fire("Success!", "You files are now in the cloud!", "success");
      setIsUploading(false);
      handleFileChange(res.items);
    } else {
      onFailed(res);
    }
  };

  const onFailed = (e) => {
    _logger("onFailed", e.response);
    setIsUploading(false);
    isAlertPopUp &&
      Swal.fire(
        "Failed to upload!",
        "Something failed while uploading your file",
        "error"
      );
  };

  const onDrop = useCallback((fileInput) => {
    setFiles(() => fileInput);
    setIsUploading(true);

    const form = new FormData();
    fileInput.forEach((item) => {
      _logger("each", item);
      form.append("files", item);
    });

    uploadFiles(form).then(onSuccess).catch(onFailed);
  });

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const fileList = () => {
    return files.map((file) => {
      return (
        <div
          key={file.name}
          className={`d-flex align-items-center p-1 my-1 shadow rounded ${
            selectedFile?.name === file.name ? "bg-info text-white" : "bg-white"
          }`}
          role="button"
          onClick={() => onSelect(file)}
        >
          <AiOutlineFile size={35} />

          <p className="mx-1 my-0">{file.name}</p>
        </div>
      );
    });
  };

  const renderThumbnail = () => {
    let preview;
    if (!selectedFile) {
      return (
        <Card className="d-flex justify-content-center align-items-center h-100">
          No preview, select a file
        </Card>
      );
    }
    const fileExtention = selectedFile.name.split(".").slice(-1)[0];
    if (acceptedFiles.nonImage.has(fileExtention))
      preview = (
        <div className="d-flex flex-column justify-content-center align-items-center py-5 h-100 bg-light">
          <MdNoPhotography size={50} />
          <p>No Preview Available for This File</p>
        </div>
      );
    else {
      const url = URL.createObjectURL(selectedFile);
      preview = (
        <div className="object-fit-cover h-100 w-100">
          <img
            src={url}
            alt="preview"
            className="h-100 mw-100 img-thumbnail img-fluid"
          />
        </div>
      );
    }
    return preview;
  };

  const onSelect = (file) => {
    setSelectedFile(file);
    renderThumbnail;
  };

  return (
    <div
      className={`${className} p-3 ${styles.fileupload_frame} d-flex mx-auto rounded-4 shadow`}
    >
      <div className={`d-flex flex-column ${styles.fileupload_widgetframe}`}>
        <div className={`p-2 p-sm-4 ${styles.fileupload_widget}`}>
          {isUploading ? (
            <div className="h-100 w-100 d-flex flex-column justify-content-center align-items-center">
              <Spinner animation="border" role="status" variant="primary">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
              <h4 className="mt-4">
                Your file is being uploaded, please be patient
              </h4>
            </div>
          ) : (
            <div className="h-100 d-flex flex-column justify-content-center align-items-center">
              <div
                className="px-3 h-100 w-100 d-flex justify-content-center align-items-center"
                {...getRootProps({ className: "dropzone" })}
              >
                <label htmlFor="file">
                  <div className="w-100 m-auto mb-4 d-flex justify-content-center">
                    <img src={file} alt="" className={styles.fileupload_icon} />
                  </div>
                  <h4 className="text-center">
                    Drag your files or click to choose file
                  </h4>
                </label>

                <input {...getInputProps()} />
              </div>
            </div>
          )}
        </div>
      </div>
      {isThumbnail && (
        <div className={styles.fileupload_preview}>{renderThumbnail()}</div>
      )}

      {files.length > 0 && isFileList && (
        <div
          className={`bg-tertiary border col rounded ${styles.fileupload_filelist}`}
        >
          <div className="h-100">{fileList()}</div>
        </div>
      )}
    </div>
  );
};

LicenseUploadWidget.propTypes = {
  handleFileChange: propTypes.func.isRequired,
  isThumbnail: propTypes.bool,
  isFileList: propTypes.bool,
  isAlertPopUp: propTypes.bool,
  className: propTypes.string,
};

export default LicenseUploadWidget;

export { getFileSize };
