import React, { useCallback, useState } from "react";
import { Card, Table } from "react-bootstrap";
import { FaSortUp, FaSortDown, FaSort, FaTrashAlt } from "react-icons/fa";
import propTypes from "prop-types";
import { formatDateTime } from "../../utils/dateFormater";
import { getFileSize } from "../fileupload/FileUploadWidget";
import { FiDownload } from "react-icons/fi";
import { HiOutlineArrowPathRoundedSquare } from "react-icons/hi2";

const FileTable = ({
  fileList,
  setCurrentSortCombo,
  handleDelete,
  handleCopy,
  handleDownload,
  isShowAllDeleted,
  handleRecover,
}) => {
  const _logger = debug.extend("FileUpload");

  const initialHeader = {
    name: { name: "name", isSorted: false, isAscending: false },
    dateCreated: { name: "dateCreated", isSorted: false, isAscending: false },
    fileSize: { name: "fileSize", isSorted: false, isAscending: false },
    download: { name: "download", isSorted: false, isAscending: false },
  };
  const [headerGroup, setHeaderGroup] = useState(initialHeader);

  const handleClick = (e) => {
    const currentName = e.currentTarget.id;
    const newState = { ...headerGroup[currentName] };
    if (newState.isSorted && newState.isAscending) {
      newState.isSorted = false;
      newState.isAscending = false;
    } else if (newState.isSorted && !newState.isAscending)
      newState.isAscending = true;
    else newState.isSorted = true;
    _logger(newState);

    switch (currentName) {
      case "name":
        setCurrentSortCombo((prev) => ({
          ...prev,
          isSorting: newState.isSorted,
          sortingType: 1,
          isAscending: newState.isAscending,
        }));
        break;
      case "dateCreated":
        setCurrentSortCombo((prev) => ({
          ...prev,
          isSorting: newState.isSorted,
          sortingType: 2,
          isAscending: newState.isAscending,
        }));
        break;
      case "fileSize":
        setCurrentSortCombo((prev) => ({
          ...prev,
          isSorting: newState.isSorted,
          sortingType: 3,
          isAscending: newState.isAscending,
        }));
        break;
      case "download":
        setCurrentSortCombo((prev) => ({
          ...prev,
          isSorting: newState.isSorted,
          sortingType: 4,
          isAscending: newState.isAscending,
        }));
        break;
      default:
        break;
    }

    setHeaderGroup({ ...initialHeader, [currentName]: newState });
  };

  const body = useCallback(() => {
    _logger("FileList", fileList);
    return fileList.map((file) => (
      <tr key={file.id}>
        <td onClick={() => handleCopy(file)}>{file.name}</td>
        <td>{formatDateTime(file.dateCreated)}</td>
        <td className="text-right text-end">{getFileSize(file.fileSize)}</td>
        <td className="h-100 ">
          {isShowAllDeleted ? (
            <div className="d-flex justify-content-center">
              <HiOutlineArrowPathRoundedSquare
                size={17}
                className="text-success"
                onClick={() => handleRecover(file.id)}
              />
            </div>
          ) : (
            <div className="d-flex justify-content-between align-items-center">
              <FiDownload
                size={20}
                role="button"
                onClick={() => handleDownload(file)}
              />
              {file.downloaded}
              <FaTrashAlt size={17} onClick={() => handleDelete(file)} />
            </div>
          )}
        </td>
      </tr>
    ));
  }, [fileList]);

  return (
    <div className="mt-2">
      <Card>
        <Card.Header className="pb-1">
          <Card.Title className="fs-4">Your Files</Card.Title>
        </Card.Header>
        <Card.Body className="pt-0">
          <Table striped bordered>
            <thead>
              <tr>
                <th
                  key={headerGroup.name.name}
                  id={headerGroup.name.name}
                  onClick={handleClick}
                  role="button"
                >
                  Name {headerGroup.name.isSorted}
                  <span>
                    {headerGroup.name.isSorted ? (
                      headerGroup.name.isAscending ? (
                        <FaSortUp className="ms-1" />
                      ) : (
                        <FaSortDown className="ms-1" />
                      )
                    ) : (
                      <FaSort className="ms-1" />
                    )}
                  </span>
                </th>
                <th
                  key={headerGroup.dateCreated.name}
                  id={headerGroup.dateCreated.name}
                  onClick={handleClick}
                  role="button"
                >
                  Date Created
                  <span>
                    {headerGroup.dateCreated.isSorted ? (
                      headerGroup.dateCreated.isAscending ? (
                        <FaSortUp className="ms-1" />
                      ) : (
                        <FaSortDown className="ms-1" />
                      )
                    ) : (
                      <FaSort className="ms-1" />
                    )}
                  </span>
                </th>
                <th
                  key={headerGroup.fileSize.name}
                  id={headerGroup.fileSize.name}
                  onClick={handleClick}
                  role="button"
                >
                  File size
                  <span>
                    {headerGroup.fileSize.isSorted ? (
                      headerGroup.fileSize.isAscending ? (
                        <FaSortUp className="ms-1" />
                      ) : (
                        <FaSortDown className="ms-1" />
                      )
                    ) : (
                      <FaSort className="ms-1" />
                    )}
                  </span>
                </th>
                <th
                  key={headerGroup.download.name}
                  id={headerGroup.download.name}
                  onClick={handleClick}
                  role="button"
                >
                  {isShowAllDeleted ? "Recover" : "Download"}{" "}
                  {headerGroup.download.isSorted}
                  <span>
                    {headerGroup.download.isSorted ? (
                      headerGroup.download.isAscending ? (
                        <FaSortUp className="ms-1" />
                      ) : (
                        <FaSortDown className="ms-1" />
                      )
                    ) : (
                      <FaSort className="ms-1" />
                    )}
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>{body()}</tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>
  );
};

FileTable.propTypes = {
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
  handleDelete: propTypes.func.isRequired,
  handleCopy: propTypes.func.isRequired,
  handleDownload: propTypes.func.isRequired,
  isShowAllDeleted: propTypes.bool.isRequired,
  handleRecover: propTypes.func.isRequired,
};

export default FileTable;
