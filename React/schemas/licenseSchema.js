import * as Yup from "yup";

const dayBefore = new Date();

const licenseSchema = Yup.object().shape({
  licenseNumber: Yup.string()
    .min(1, "Enter a license number.")
    .required("A license number is required."),
  licenseName: Yup.string()
    .min(1, "Enter a license name.")
    .required("A License Name is required."),
  licenseStateId: Yup.number()
    .min(1, "A selection is required.")
    .required("A State is required."),
  expirationDate: Yup.date()
    .typeError("Datatype is Invalid")
    .min(dayBefore, "Date must be a future date.")
    .required("A Date is required."),
});

export default licenseSchema;
