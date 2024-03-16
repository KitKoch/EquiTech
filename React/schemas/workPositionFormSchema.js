import React from "react";
import * as Yup from "yup";

const workPositionFormSchema = 
  Yup.object().shape({
    name: Yup.string()
    .min(2, "Must be at least 2 characters")
    .max(100)
    .required(<em>*required</em>),
    description: Yup.string()
    .min(2, "Must be at least 2 characters")
    .max(500)
    .required(<em>*required</em>),
    wageTypeId: Yup.number()
    .required(<em>*required</em>)
    .positive()
    .integer()
    .min(1),
    jobTypeId: Yup.number()
    .required(<em>*required</em>)
    .positive()
    .integer()
    .min(1),
  });

  export default workPositionFormSchema;