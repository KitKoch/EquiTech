import React, { useState } from "react";
import Loki from "react-loki";
import FileUploadWidget from "../fileupload/FileUploadWidget";
import PdfViewer from "./PdfViewer";
import "./pdfviewer.css";

const PdfWizard = () => {
  const _logger = debug.extend("wizard");

  const [extractedData, setExtractedData] = useState([]);
  const [pdfUrl, setPdfUrl] = useState("");
  _logger("extractedData", extractedData);

  const onFileUpload = (fileReponse) => {
    setPdfUrl(fileReponse[0].url);
  };

  const handleExtractedData = (data) => {
    _logger("getting the data from the viewer", data);
    setExtractedData(data);
  };

  const mySteps = [
    {
      label: "File Upload",
      component: (
        <FileUploadWidget
          isThumbnail={true}
          isFileList={true}
          handleFileChange={(files) => onFileUpload(files)}
          isAlertPopUp={true}
        />
      ),
    },
    {
      label: "Pdf Viewer",
      component: (
        <PdfViewer
          url={pdfUrl}
          key={pdfUrl}
          onExtractedData={handleExtractedData}
        />
      ),
    },
  ];

  const _onFinish = () => {
    _logger("Loki finished");
  };

  return (
    <div className="myWizard">
      <Loki steps={mySteps} onFinish={_onFinish} />
    </div>
  );
};

export default PdfWizard;
