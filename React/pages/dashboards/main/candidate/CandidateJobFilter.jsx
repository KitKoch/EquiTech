import React, { useState, useEffect } from "react";
import { Col, Form, Row } from "react-bootstrap";
import Select from "react-select";
import { getTypes } from "../../../../services/lookUpService";
import PropTypes from "prop-types";
import toastr from "toastr";

const _logger = debug.extend("JobFilter");

function CandidateJobFilter(props) {
  const [jobFilter, setJobFilter] = useState({
    jobTypeData: [{ value: "", label: "" }],
  });

  useEffect(() => {
    getTypes(["JobTypes"]).then(onGetJobTypesSuccess).catch(onGetJobTypesError);
  }, []);

  const mapJobType = (aJobType) => {
    _logger(aJobType);
    return { value: aJobType.id, label: aJobType.name };
  };

  const onGetJobTypesSuccess = (data) => {
    let jobTypes = data.item.jobTypes;
    setJobFilter((...prevState) => {
      const jtdata = { ...prevState };
      jtdata.jobTypeData = jobTypes.map(mapJobType);

      return jtdata;
    });
  };

  const onGetJobTypesError = (err) => {
    _logger(err);
    toastr.error(
      "Sorry! We didn’t find any jobs matching your criteria. Please modify your search and try again."
    );
  };

  const selectJobType = (value) => {
    _logger(value, props);
    props.filterByJobType(value);
  };

  return (
    <Row>
      <Col lg="3">
        <Form.Group className="mb-3">
          <Select
            name="jobtype"
            id="select-job"
            className="react-select-container"
            classNamePrefix="react-select"
            options={jobFilter.jobTypeData}
            placeholder="By Job Type"
            onChange={selectJobType}
            value={props?.filterSelection}
            isClearable
            size="sm"
          />
        </Form.Group>
      </Col>
    </Row>
  );
}

CandidateJobFilter.propTypes = {
  filterByJobType: PropTypes.func.isRequired,
  filterSelection: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.number,
  }),
};
export default CandidateJobFilter;
