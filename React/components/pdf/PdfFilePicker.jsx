import React, { useState } from "react";
import PdfViewer from "./PdfViewer";
import FileUploadWidget from "../fileupload/FileUploadWidget";

function PdfFilePicker() {
  const [pdfUrl, setPdfUrl] = useState("");

  const onFileUpload = (fileReponse) => {
    setPdfUrl(fileReponse[0].url);
  };

  return (
    <React.Fragment>
      <div>
        <h1>File picker</h1>
        <FileUploadWidget
          isThumbnail={true}
          isFileList={true}
          handleFileChange={(files) => onFileUpload(files)}
          isAlertPopUp={true}
        />
      </div>
      <PdfViewer url={pdfUrl} key={pdfUrl} />
    </React.Fragment>
  );
}

export default PdfFilePicker;
