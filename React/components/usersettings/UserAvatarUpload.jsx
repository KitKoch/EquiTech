import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { AiOutlineFile } from "react-icons/ai";
import Swal from "sweetalert2";
import Spinner from "react-bootstrap/Spinner";
import { uploadFiles } from "../../services/fileService";
import propTypes from "prop-types";
import { MdNoPhotography } from "react-icons/md";
import { Card, Button } from "react-bootstrap";
import { Upload } from "react-feather";

const getFileSize = (size) => {
  const prefix = ["b", "kb", "mb", "gb"];
  let index = 0;
  while (size > 1024) {
    size /= 1024;
    index += 1;
  }
  return `${Math.round(size)}${prefix[index]}`;
};

const FileUploadWidget = ({
  handleFileChange,
  isThumbnail = false,
  isFileList = false,
  isAlertPopUp = true,
  className,
}) => {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const _logger = debug.extend("AvatarUpload");

  const acceptedFiles = {
    image: new Set(["png", "jpeg", "jpg", "gif", "webp", "svg"]),
  };

  const onSuccess = (res) => {
    if (res?.items?.length > 0) {
      _logger("file upload response", res.items);
      isAlertPopUp &&
        Swal.fire("Success!", "Your avatar has been updated!", "success");
      setIsUploading(false);
      handleFileChange(res);
      return;
    } else {
      onFailed(res);
    }
  };
  const onFailed = (e) => {
    _logger(e.response);
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
      className={`${className} d-flex mx-auto rounded-4 text-center justify-content-center align-items-center`}
    >
      <div>
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
          <div
            className="px-3 h-100 w-100 d-flex justify-content-center align-items-center"
            {...getRootProps({ className: "dropzone" })}
          >
            <div className="text-center">
              <Button variant="primary">
                <Upload className="feather" /> Upload
              </Button>
            </div>

            <input {...getInputProps()} />
          </div>
        )}
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

FileUploadWidget.propTypes = {
  handleFileChange: propTypes.func.isRequired,
  isThumbnail: propTypes.bool,
  isFileList: propTypes.bool,
  isAlertPopUp: propTypes.bool,
  className: propTypes.string,
};

export default FileUploadWidget;

export { getFileSize };
