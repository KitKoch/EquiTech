import * as Yup from "yup";

const candidatePreference = Yup.object().shape({
  minimumPay: Yup.number("This must be a Number")
    .min(1)
    .required("This is Required"),
  desiredPay: Yup.number("This must be a Number")
    .min(1)
    .max(4000)
    .required("This is Required"),
  isHourly: Yup.bool(), 
});

const resumeFormSchema = { candidatePreference };
export default resumeFormSchema; 
