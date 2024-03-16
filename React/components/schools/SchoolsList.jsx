import React, { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import schoolService from "../../services/schoolService";
import SchoolCard from "./SchoolCard";

const SchoolsList = () => {
  const _logger = debug.extend("SchoolsList");

  const [list, setList] = useState({
    schools: [],
    schoolComponents: [],
  });

  useEffect(() => {
    schoolService.getAll().then(onGetSuccess).catch(onGetError);
  }, []);

  const onGetSuccess = (response) => {
    let schoolArray = response.items;
    setList((prev) => {
      const n = { ...prev };
      n.schools = schoolArray;
      n.schoolComponents = schoolArray.map(mapSchools);
      return n;
    });
  };
  const mapSchools = (school) => {
    return <SchoolCard school={school} key={school.id} />;
  };

  const onGetError = (response) => {
    _logger(response);
  };

  return (
    <>
      <Container>
        <Row>{list.schoolComponents}</Row>
      </Container>
    </>
  );
};

export default SchoolsList;
