import React from "react";
import { Formik, Form, Field } from "formik";
import { Button, Card, InputGroup } from "react-bootstrap";
import FileUploadWidget from "./FileUploadWidget";

const FileUploadExample = () => {
  const _logger = debug.extend("Files");

  const initialValue = {
    username: "",
    email: "",
    password: "",
    files: [],
  };

  const onFileChange = (fileReponse, setFieldValue) => {
    _logger("file response", fileReponse);
    setFieldValue("files", fileReponse);
  };

  const handleSubmit = (formValue) => {
    // formValue.fileIds = files.map((file) => file.id);
    _logger(formValue);
  };
  return (
    <div className="container align-items-center justify-content-center">
      <div className="row ">
        <Card className="col justify-content-center align-items-center p-3">
          <h3 className="fs-2">FileUpload Example</h3>
          <Formik
            enableReinitialize={true}
            initialValues={initialValue}
            onSubmit={handleSubmit}
          >
            {({ setFieldValue }) => (
              <Form className="d-flex flex-column align-items-center">
                <InputGroup className="mb-2">
                  <Field
                    placeholder="username"
                    id="username"
                    name="username"
                    className="m-auto"
                  />
                </InputGroup>
                <InputGroup className="mb-2">
                  <Field
                    placeholder="email"
                    id="email"
                    name="email"
                    className="m-auto"
                  />
                </InputGroup>
                <InputGroup className="mb-2">
                  <Field
                    placeholder="password"
                    id="password"
                    name="password"
                    className="m-auto"
                  />
                </InputGroup>
                <Button type="submit" variant="primary">
                  Submit
                </Button>
                <Card className="col">
                  <FileUploadWidget
                    isThumbnail={true}
                    isFileList={true}
                    handleFileChange={(files) =>
                      onFileChange(files, setFieldValue)
                    }
                    isAlertPopUp={true}
                  />
                </Card>
              </Form>
            )}
          </Formik>
        </Card>
      </div>
    </div>
  );
};

export default FileUploadExample;
