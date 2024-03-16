import React from "react";
import * as Yup from "yup";

const addSchema = Yup.object().shape({
  name: Yup.string()
    .min(2)
    .max(500)
    .required(<em>*required</em>),
  locationId: Yup.number()
    .required(<em>*required</em>)
    .positive()
    .integer()
    .min(1),
  name: Yup.string()
    .min(2)
    .max(500)
    .required(<em>*required</em>),
});

export default { addSchema };
