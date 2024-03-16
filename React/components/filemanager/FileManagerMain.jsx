import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import FileTable from "./FilteTable";
import FileTableThumbnail from "./FileTableThumbnail";
import { Button } from "react-bootstrap";
import FilterDropDown from "./FilterDropDown";
import {
  getAllFileList,
  searchFile,
  download,
  recoverFile,
} from "../../services/fileService";
import Swal from "sweetalert2";
import FileUploadWidget from "../fileupload/FileUploadWidget";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import styles from "./FileManager.module.css";
import { IoGrid } from "react-icons/io5";
import { FaTrashAlt, FaListUl } from "react-icons/fa";
import toastr from "toastr";
import { deleteFile } from "../../services/fileService";

const FileManagerMain = () => {
  const [isFilter, setIsFilter] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [showWidget, setShowWidget] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isTableList, setIsTableList] = useState(
    window.innerWidth > 728 ? true : false
  );
  const [isShowAllDeleted, setIsShowAllDeleted] = useState(false);

  const _logger = debug.extend("FileUpload");
  _logger(selectedFiles);
  const initialPagination = {
    pageIndex: 0,
    pageSize: 15,
    totalPage: 1,
    totalCount: 0,
  };
  const initialSearchCombo = {
    searchTerm: "",
    isSorting: false,
    sortingType: 0,
    isAscending: false,
    fileType: 0,
    extension: "",
  };
  const [pagination, setPagination] = useState(initialPagination);
  const [currentSortCombo, setCurrentSortCombo] = useState(initialSearchCombo);

  const handleFilter = () => {
    setIsFilter((filter) => !filter);
  };

  const onFetchSuccess = (res) => {
    const files = res.item.pagedItems;
    setPagination({
      pageIndex: res.item.pageIndex,
      pageSize: res.item.pageSize,
      totalCount: res.item.totalCount,
      totalPage: res.item.totalPage,
    });
    _logger(res);
    setFileList(files);
    _logger(fileList);
  };
  const onFetchFailed = (e) => {
    _logger(e);
    Swal.fire(
      "Somthing went wrong!",
      "Somthing failed when fetching your data",
      "error"
    );
  };

  useEffect(() => {
    getAllFileList(pagination.pageIndex, pagination.pageSize)
      .then(onFetchSuccess)
      .catch(onFetchFailed);
  }, [pagination.pageIndex]);

  const handlePageChange = (page) => {
    setPagination({ ...pagination, pageIndex: page - 1 });
  };

  useEffect(() => {
    searchFile(
      pagination.pageIndex,
      pagination.pageSize,
      currentSortCombo.searchTerm,
      currentSortCombo.isSorting,
      currentSortCombo.sortingType,
      currentSortCombo.isAscending,
      false,
      currentSortCombo.fileType,
      currentSortCombo.extension,
      isShowAllDeleted
    )
      .then(onFetchSuccess)
      .catch(onFetchFailed);
  }, [currentSortCombo, isShowAllDeleted]);

  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth < 728) {
        setIsTableList(false);
      }
    });
  }, []);

  const onFileChange = (fileReponse) => {
    _logger("file response", fileReponse);
    setFileList((fileList) => [...fileList, ...fileReponse]);
  };

  const toggleWidget = () => setShowWidget(!showWidget);

  const clearSelect = () => {
    setSelectedFiles([]);
  };

  const onDeleteSuccess = (file) => {
    Swal.fire({
      icon: "success",
      title: "Success!",
      text: "File has been deleted",
    });
    setFileList((list) => {
      return list.filter((item) => item.id !== file.id);
    });
  };
  const onDeleteFailed = () => {
    Swal.fire({
      icon: "error",
      title: "Oops!",
      text: "Something has failed",
    });
  };

  const handleDelete = (file) => {
    Swal.fire({
      icon: "warning",
      text: "Do you want to move this file to trash?",
      showCancelButton: true,
      confirmButtonText: "Confirm",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteFile(file.id)
          .then(() => onDeleteSuccess(file))
          .catch(onDeleteFailed);
      }
    });
  };
  const handleCopy = (file) => {
    navigator.clipboard.writeText(file.url);
    toastr.success("File link copied!");
  };

  const handleDownload = (file) => {
    let link = document.createElement("a");
    link.href = file.url;
    link.download = file.name;
    link.target = "_blank";
    link.click();
    download(file.id);
  };

  const onSuccessDelete = () => {
    Swal.fire({
      icon: "success",
      title: "Success!",
      text: "File has been deleted",
    });
    setSelectedFiles([]);
    setCurrentSortCombo(initialSearchCombo);
  };

  const deleteMany = () => {
    _logger("seletedcd", selectedFiles);
    try {
      selectedFiles.forEach(async (id) => {
        await deleteFile(id);
      });
    } catch (e) {
      onDeleteFailed();
    } finally {
      onSuccessDelete();
    }
  };
  const deleteSeleted = () => {
    Swal.fire({
      icon: "warning",
      text: "Do you want to move this file to trash?",
      showCancelButton: true,
      confirmButtonText: "Confirm",
    }).then(deleteMany);
  };

  const recoverSuccess = () => {
    toastr.success("File recovered");
  };

  const handleRecover = (fileId) => {
    recoverFile(fileId).then(recoverSuccess).catch(onDeleteFailed);
    setIsShowAllDeleted(false);
  };

  return (
    <section>
      <div className="d-flex flex-column flex-md-row">
        <div className="position-relative flex-grow-1 mt-1 mt-md-0">
          <SearchBar
            onFilter={handleFilter}
            setCurrentSortCombo={setCurrentSortCombo}
          />
          {isFilter && (
            <FilterDropDown
              className="position-absolute rounded p-2 end-0 w-25 z-10 bg-white shadow"
              setCurrentSortCombo={setCurrentSortCombo}
              isShowAllDeleted={isShowAllDeleted}
              setIsShowAllDeleted={setIsShowAllDeleted}
            />
          )}
        </div>
        <Button
          variant={showWidget ? "danger" : "primary"}
          onClick={toggleWidget}
        >
          {showWidget ? "Hide" : "Upload"}
        </Button>
      </div>
      {showWidget && (
        <FileUploadWidget
          isThumbnail={true}
          isFileList={true}
          handleFileChange={(files) => onFileChange(files)}
          isAlertPopUp={true}
          className="my-3 shadow px-2"
        />
      )}
      <div className="d-flex flex-column flex-md-row mt-2 position-sticky">
        <Pagination
          pageSize={pagination.pageSize}
          current={pagination.pageIndex + 1}
          total={pagination.totalCount}
          onChange={handlePageChange}
        />
        <div className="mt-2 mt-md-0 ms-md-3 d-flex justify-between flex-grow-1">
          <div className="flex-grow-1">
            {selectedFiles.length > 0 && (
              <div className="d-flex gap-3 align-items-center ">
                <div>{`${selectedFiles.length} ${
                  selectedFiles.length > 1 ? "files" : "file"
                } selected`}</div>
                <FaTrashAlt
                  size={25}
                  role="button"
                  className={styles.filemanager_button}
                  onClick={deleteSeleted}
                />
                <Button variant="danger" onClick={clearSelect}>
                  Clear
                </Button>
              </div>
            )}
          </div>

          <div className="d-none d-md-flex gap-2 ">
            <FaListUl
              size={25}
              role="button"
              className={isTableList && "text-primary"}
              onClick={() => setIsTableList(true)}
            />
            <IoGrid
              size={25}
              role="button"
              className={!isTableList && "text-primary"}
              onClick={() => setIsTableList(false)}
            />
          </div>
        </div>
      </div>
      <div className={styles.filemanager_table}>
        {isTableList ? (
          <FileTable
            fileList={fileList}
            pagination={pagination}
            setCurrentSortCombo={setCurrentSortCombo}
            handleDelete={handleDelete}
            handleCopy={handleCopy}
            handleDownload={handleDownload}
            isShowAllDeleted={isShowAllDeleted}
            handleRecover={handleRecover}
          />
        ) : (
          <FileTableThumbnail
            fileList={fileList}
            setFileList={setFileList}
            pagination={pagination}
            setCurrentSortCombo={setCurrentSortCombo}
            setSelectedFiles={setSelectedFiles}
            selectedFiles={selectedFiles}
            handleDelete={handleDelete}
            handleCopy={handleCopy}
            handleDownload={handleDownload}
            isShowAllDeleted={isShowAllDeleted}
            handleRecover={handleRecover}
          />
        )}
      </div>
    </section>
  );
};

export default FileManagerMain;
