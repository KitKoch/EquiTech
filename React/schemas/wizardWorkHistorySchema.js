import * as Yup from "yup";

const wizardWorkHistorySchema = Yup.object().shape({
    companyName: Yup.string()
    .required("Required"),
    contactReference: Yup.string()
    .required("Required"),
    companyEmail: Yup.string()
    .required("Required"),
    companyPhone: Yup.string()
    .required("Required"),
    locations: Yup.string()
    .required("Required"),
    industries: Yup.string()
    .required("Required"),
    startDate: Yup.string()
    .required("Required"),
    endDate: Yup.string()
    .required("Required")
});

export default wizardWorkHistorySchema;