import * as Yup from "yup";


const locationFormSchema = Yup.object().shape({
    locationTypeId: Yup.number().required("Is required"),
    lineOne: Yup.string().min(2).max(255).required("Is required"),
    lineTwo: Yup.string(),
    city: Yup.string().min(1).max(225).required("Is required"),
    zip: Yup.string().min(1).max(50),
    stateId: Yup.number().required("Is required"),
    latitude: Yup.number().required("Is required"),
    longitude: Yup.number().required("Is required"),
  });

  export default locationFormSchema;