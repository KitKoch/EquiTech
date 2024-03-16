import React, { useEffect, useState } from "react";
import { Card, Container, Col, Row, Button } from "react-bootstrap";
import { Formik, Form as FormikForm, Field, ErrorMessage } from "formik";
import * as Icon from "react-feather";
import Chart from "react-apexcharts";
import analyticsDatePickSchema from "../../schemas/analyticsDatePickSchema";
import usePalette from "../../hooks/usePalette";
import siteRefServices from "../../services/siteReferenceService";

const _logger = debug.extend("SiteReferenceChart");

function SiteReferenceChart() {
  const palette = usePalette();
  const [lineData, setLineData] = useState({
    data: [{ name: "Total Count", data: [] }],
    category: [],
  });
  const [hasDateChanged, setHasDateChanged] = useState(false);

  const today = new Date(Date.now());
  const oneWeekAgo = new Date(today - 7 * 24 * 60 * 60 * 1000);

  const [dates, setDates] = useState({
    startDate: oneWeekAgo.toISOString().substring(0, 10),
    endDate: today.toISOString().substring(0, 10),
  });

  const formDates = {
    startDate: dates.startDate,
    endDate: dates.endDate,
  };

  const options = {
    chart: {
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: [5, 7, 5],
      curve: "straight",
      dashArray: [0, 8, 5],
    },
    xaxis: {
      title: {
        text: "Sites",
        style: {
          fontSize: "18px",
          fontFamily: "Arial",
        },
      },
      categories: lineData.category,
    },
    markers: {
      size: 0,
      style: "hover",
    },
    tooltip: {
      y: [
        {
          formatter: function (val) {
            return val;
          },
        },
      ],
    },
    grid: {
      borderColor: "#f1f1f1",
    },
    colors: [palette.primary],
    noData: {
      text: "No data available for these dates",
      align: "center",
      verticalAlign: "middle",
      offsetX: 0,
      offsetY: 0,
      style: {
        color: "black",
        fontSize: "24px",
        fontFamily: undefined,
      },
    },
  };

  const onDatePick = (values) => {
    setDates((prevState) => {
      const newDates = { ...prevState };
      newDates.startDate = values.startDate;
      newDates.endDate = values.endDate;
      setHasDateChanged(true);
      return newDates;
    });
  };

  const onGetChartInfoSuccess = (response) => {
    _logger(response);
    let data = response.item;
    setLineData((prevState) => {
      const newSt = { ...prevState };
      newSt.data[0].data = data.map(mapRefCount);
      newSt.category = data.map(mapRefName);
      return newSt;
    });
  };

  const onGetChartInfoError = (err) => {
    _logger(err);
  };

  const onGetDataByDatesSuccess = (response) => {
    _logger(response);
    const data = response.item;

    setLineData((prevState) => {
      const newSt = { ...prevState };
      newSt.data[0].data = data.map(mapRefCount);
      newSt.category = data.map(mapRefName);
      setHasDateChanged(false);
      return newSt;
    });
  };

  const onGetDataByDatesError = (err) => {
    _logger(err);
    setLineData((prevState) => {
      const newSt = { ...prevState };
      newSt.data[0].data = [];
      newSt.category = [];
      setHasDateChanged(false);
      return newSt;
    });
  };

  const mapRefName = (item) => {
    return item.referenceType.name;
  };

  const mapRefCount = (item) => {
    return item.totalCount;
  };

  useEffect(() => {
    if (hasDateChanged) {
      siteRefServices
        .getDataByDates(formDates.startDate, formDates.endDate)
        .then(onGetDataByDatesSuccess)
        .catch(onGetDataByDatesError);
    }
  }, [hasDateChanged]);

  useEffect(() => {
    siteRefServices
      .referenceChartInfo()
      .then(onGetChartInfoSuccess)
      .catch(onGetChartInfoError);
  }, []);

  return (
    <>
      <Container>
        <Row className="mb-2 mb-xl-3">
          <Col xs="auto" className="ms-auto text-end mt-n1">
            <Formik
              enableReinitialize={true}
              initialValues={formDates}
              onSubmit={onDatePick}
              validationSchema={analyticsDatePickSchema}
            >
              <FormikForm>
                <Container>
                  <Row>
                    <Col className="px-1">
                      <Field
                        name="startDate"
                        className="form-control"
                        type="date"
                      ></Field>
                      <ErrorMessage
                        className="analytics-date-error"
                        name="startDate"
                        component="div"
                      />
                    </Col>
                    <Col className="px-1">
                      <Field
                        name="endDate"
                        className="form-control"
                        type="date"
                      ></Field>
                      <ErrorMessage
                        className="analytics-date-error"
                        name="endDate"
                        component="div"
                      />
                    </Col>
                    <Col className="px-1">
                      <Button
                        type="submit"
                        variant="primary"
                        className="shadow-sm"
                      >
                        <Icon.RefreshCw className="feather" />
                      </Button>
                    </Col>
                  </Row>
                </Container>
              </FormikForm>
            </Formik>
          </Col>
        </Row>
        <Card>
          <Card.Header className="text-center">
            <h1>Site References Analytics</h1>
          </Card.Header>
          <Card.Body>
            {<Chart options={options} type="bar" series={lineData.data} />}
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}

export default SiteReferenceChart;
