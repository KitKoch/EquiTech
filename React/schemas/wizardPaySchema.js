import * as Yup from "yup";

const wizardPaySchema = Yup.object().shape({
    minimumPay: Yup.number()
    .min(1)
    .required("This is Required"),
    desiredPay: Yup.number()
    .min(1)
    .required("This is Required"),
    
    isHourly: Yup.bool()
});

export default wizardPaySchema;