import React, { useState } from "react";
import {
  FaLaptopCode,
  FaLaptop,
  FaUserEdit,
  FaCheckCircle,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Loki from "react-loki";
import JobsFormsPart1 from "./JobsFormPart1";
import JobsFormPart2 from "./JobsFormPart2";
import JobsFormPart3 from "./JobsFormPart3";
import JobsFormPart4 from "./JobsFormPart4";
import "./loki-job-style.css";
import Swal from "sweetalert2";

const _logger = logger.extend("NewJobPosting");

export default function NewJobPosting() {
  const navigate = useNavigate();
  const [job, setJob] = useState({
    title: "",
    description: "",
    requirements: "",
    jobTypeId: "",
    jobStatusId: "",
    organizationId: "",
    locationId: "",
    remoteStatusId: "",
    contactName: "",
    contactPhone: "",
    contactEmail: "",
    estimatedStartDate: "",
    estimatedFinishDate: "",
  });

  const mergeValues = (values) => {
    setJob({
      ...job,
      ...values,
    });
  };

  const finishWizard = () => {
    const data = job;
    Swal.fire({
      title: "New Job Posting",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Add Job",
      denyButtonText: `Don't save`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: "success",
          title: "New Job Posting added!",
          confirmButtonText: "Ok",
        });
        navigate("/jobs/wizard");
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });

    _logger("submitted", data);
  };

  const complexSteps = [
    {
      label: "Step 1",
      icon: <FaLaptop className="mt-3" />,
      component: <JobsFormsPart1 job={job} />,
    },
    {
      label: "Step 2",
      icon: <FaLaptopCode className="mt-3" />,
      component: <JobsFormPart2 job={job} />,
    },
    {
      label: "Step 3",
      icon: <FaUserEdit className="mt-3" />,
      component: <JobsFormPart3 job={job} />,
    },
    {
      label: "Step 4",
      icon: <FaCheckCircle className="mt-3" />,
      component: <JobsFormPart4 job={job} />,
    },
  ];

  return (
    <div>
      <Loki
        steps={complexSteps}
        onNext={mergeValues}
        onBack={mergeValues}
        onFinish={finishWizard}
        noActions
      />
    </div>
  );
}
