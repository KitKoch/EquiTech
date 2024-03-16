import React, { useEffect, useState } from "react";
import { Field, Formik, Form } from "formik";
import propTypes from "prop-types";
import Select from "react-select";

const FilterDropDown = ({
  className,
  setCurrentSortCombo,
  isShowAllDeleted,
  setIsShowAllDeleted,
}) => {
  const [options, setOptions] = useState([{ value: "", label: "All" }]);
  const [currentExtension, setCurrentExtension] = useState("");
  const [currentType, setCurrentType] = useState("0");
  const _logger = debug.extend("FileUpload");

  const images = ["png", "jpeg", "jpg", "gif", "webp", "svg"];
  const document = ["doc", "pdf", "txt", "xls"];
  const other = ["csv", "html", "json", "ppt", "sql"];
  const mappedImages = images.map((file) => ({ value: file, label: file }));
  const mappedDocs = document.map((file) => ({ value: file, label: file }));
  const mappedOthers = other.map((file) => ({ value: file, label: file }));

  const getOptions = (key) => {
    switch (key) {
      case "1":
        setOptions([{ value: "", label: "All" }, ...mappedImages]);
        break;
      case "2":
        setOptions([{ value: "", label: "All" }, ...mappedDocs]);
        break;
      case "3":
        setOptions([{ value: "", label: "All" }, ...mappedOthers]);
        break;
      default:
        setOptions([
          { value: "", label: "All" },
          ...mappedDocs,
          ...mappedImages,
          ...mappedOthers,
        ]);
        break;
    }
  };

  useEffect(() => {
    getOptions(currentType);
    _logger("sending", "", currentType);
    setCurrentSortCombo((prev) => ({
      ...prev,
      fileType: parseInt(currentType),
    }));
  }, [currentType]);

  useEffect(() => {
    _logger("sending", currentExtension, currentType);
    setCurrentSortCombo((prev) => ({
      ...prev,
      extension: currentExtension,
    }));
  }, [currentExtension]);

  const initialValues = {
    fileType: "0",
    fileExtension: "",
  };

  const handleTypeChange = (e) => {
    setCurrentType(e.target.value);
  };

  const handleSetExtension = (e) => {
    setCurrentExtension(e.value);
  };
  const toggleShowDeleted = () => {
    setIsShowAllDeleted((state) => !state);
  };

  return (
    <div className={`${className}`}>
      <Formik initialValues={initialValues}>
        {({}) => (
          <Form>
            <hr />
            <div
              role="group"
              aria-labelledby="my-radio-group"
              className="d-flex flex-column"
              onChange={handleTypeChange}
            >
              <label className="d-flex">
                <Field
                  type="radio"
                  name="fileType"
                  value="0"
                  className="me-2"
                />
                All
              </label>
              <label className="d-flex">
                <Field
                  type="radio"
                  name="fileType"
                  value="1"
                  className="me-2"
                />
                Images
              </label>
              <label className="d-flex">
                <Field
                  type="radio"
                  name="fileType"
                  value="2"
                  className="me-2"
                />
                Documents
              </label>
              <label className="d-flex">
                <Field
                  type="radio"
                  name="fileType"
                  value="3"
                  className="me-2"
                />
                Others
              </label>
              <Select options={options} onChange={handleSetExtension} />
            </div>
          </Form>
        )}
      </Formik>
      <div>
        <input
          type="checkbox"
          checked={isShowAllDeleted}
          onChange={toggleShowDeleted}
        />
        Show only deleted
      </div>
    </div>
  );
};

FilterDropDown.propTypes = {
  className: propTypes.string,
  setCurrentSortCombo: propTypes.func.isRequired,
  isShowAllDeleted: propTypes.bool.isRequired,
  setIsShowAllDeleted: propTypes.func.isRequired,
};

export default FilterDropDown;
