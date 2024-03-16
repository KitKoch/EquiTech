import React, { useCallback } from "react";
import { Card } from "react-bootstrap";
import propTypes from "prop-types";
import FileItemCard from "./FileItemCard";

const FileTableThumbnail = ({
  fileList,
  selectedFiles,
  setSelectedFiles,
  handleDelete,
  handleCopy,
  handleDownload,
  isShowAllDeleted,
  handleRecover,
}) => {
  const _logger = debug.extend("FileUpload");

  const body = useCallback(() => {
    _logger(fileList);
    return fileList.map((file) => (
      <div key={file.id}>
        <FileItemCard
          file={file}
          selectedFiles={selectedFiles}
          setSelectedFiles={setSelectedFiles}
          handleDelete={handleDelete}
          handleCopy={handleCopy}
          handleDownload={handleDownload}
          isShowAllDeleted={isShowAllDeleted}
          handleRecover={handleRecover}
        />
      </div>
    ));
  }, [fileList, selectedFiles]);

  return (
    <div className="mt-2 h-100">
      <Card className="h-100">
        <Card.Body className="container h-100">
          <div className="row row-cols-2 row-cols-lg-3 row-cols-xl-4 h-100 overflow-hidden">
            {body()}
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

FileTableThumbnail.propTypes = {
  fileList: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.number,
      name: propTypes.string,
      url: propTypes.string,
      fileType: propTypes.shape({
        id: propTypes.number,
        name: propTypes.string,
      }),
      dateCreated: propTypes.string,
      fileSize: propTypes.number,
      downloaded: propTypes.number,
    })
  ).isRequired,
  setCurrentSortCombo: propTypes.func.isRequired,
  setSelectedFiles: propTypes.func.isRequired,
  selectedFiles: propTypes.arrayOf(propTypes.number).isRequired,
  setFileList: propTypes.func.isRequired,
  handleDelete: propTypes.func.isRequired,
  handleCopy: propTypes.func.isRequired,
  handleDownload: propTypes.func.isRequired,
  isShowAllDeleted: propTypes.bool.isRequired,
  handleRecover: propTypes.func.isRequired,
};

export default FileTableThumbnail;
