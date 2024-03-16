import React from "react";
import * as Yup from "yup";

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const workHistoryFormSchema = 
  Yup.object().shape({
    companyName: Yup.string()
    .min(2, "Must be at least 2 characters")
    .max(100)
    .required(<em>*required</em>),
    companyContact: Yup.string()
    .min(2, "Must be at least 2 characters")
    .max(200)
    .required(<em>*required</em>),
    companyEmail: Yup.string().email("Invalid email entered").required(<em>*required</em>),
    companyPhone: Yup.string().matches(phoneRegExp, 'Phone number is not valid'),
    locationId: Yup.number()
    .required(<em>*required</em>)
    .positive()
    .integer()
    .min(1),
    industryId: Yup.number()
    .required(<em>*required</em>)
    .positive()
    .integer()
    .min(1),
    startDate: Yup.date().required(<em>*required</em>),
    endDate: Yup.date().required(<em>*required</em>),
  });

  export default workHistoryFormSchema;