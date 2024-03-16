import React from "react";
import * as Yup from "yup";

const addSchema = Yup.object().shape({
  skillId: Yup.number()
    .required(<em>*required</em>)
    .positive()
    .integer()
    .min(1),
  experienceLevelId: Yup.number()
    .required(<em>*required</em>)
    .positive()
    .integer()
    .min(1),
  years: Yup.number()
    .required(<em>*required</em>)
    .positive()
    .integer(),
  months: Yup.number()
    .required(<em>*required</em>) 
    .positive()
    .integer()
    .max(11),
}); 


export default { addSchema };
