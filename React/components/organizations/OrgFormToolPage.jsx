import React, { useState } from "react";
import { FaLaptop, FaCheckCircle } from "react-icons/fa";
import { Navigation } from "react-feather";
import { Helmet } from "react-helmet-async";
import Loki from "react-loki";
import OrgFormToolPart1 from "./OrgFormToolPart1";
import OrgFormToolPart2 from "./OrgFormToolPart2";
import OrgFormToolPart3 from "./OrgFormToolPart3";
import "./loki-organization-style.css";
import { Container } from "react-bootstrap";
import organizationsServices from "../../services/organizationsServices";
import toastr from "toastr";
import "toastr/build/toastr.css";
import { useNavigate } from "react-router-dom";

const _loggerPage = logger.extend("ORG");

function OrgFormToolPage() {
  const [orgLoc, setOrgLoc] = useState({
    name: "",
    headline: "",
    description: "",
    logo: "",
    organizationTypeId: "",
    organizationTypeName: "",
    phone: "",
    siteUrl: "",
    locationTypeId: "",
    locationTypeName: "",
    lineOne: "",
    lineTwo: "",
    city: "",
    zip: "",
    stateId: "",
    stateName: "",
    latitude: 0,
    longitude: 0,
  });

  const mergeValues = (values) => {
    setOrgLoc({
      ...orgLoc,
      ...values,
    });
    _loggerPage("values merged", orgLoc, values);
  };

  function onFinalSubmit() {
    organizationsServices
      .orgLocBridgeInsert(orgLoc)
      .then(onInsertSuccess)
      .catch(onInsertError);
  }

  const navigate = useNavigate();

  const onInsertSuccess = (response) => {
    toastr.success("Add organization success", response);

    let viewMorePageUrl = "/admin/organizations";
    navigate(viewMorePageUrl);
  };

  const onInsertError = (error) => {
    toastr.error("Add organization unsuccessful", error);
  };

  const orgFormSteps = [
    {
      label: "Step 1",
      icon: <FaLaptop className="mt-3" />,
      component: <OrgFormToolPart1 orgLoc={orgLoc} />,
    },
    {
      label: "Step 2",
      icon: <Navigation className="mt-3" />,
      component: <OrgFormToolPart2 orgLoc={orgLoc} />,
    },
    {
      label: "Step 3",
      icon: <FaCheckCircle className="mt-3" />,
      component: (
        <OrgFormToolPart3 orgLoc={orgLoc} onFinalSubmit={onFinalSubmit} />
      ),
    },
  ];

  return (
    <React.Fragment>
      <Helmet title="Formik" />
      <Container>
        <h1>Add Organization</h1>
        <div>
          <Loki
            steps={orgFormSteps}
            onNext={mergeValues}
            onBack={mergeValues}
            noActions
          />
        </div>
      </Container>
    </React.Fragment>
  );
}

export default OrgFormToolPage;
