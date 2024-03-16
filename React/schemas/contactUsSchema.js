import * as Yup from "yup";

const contactUsSchema = Yup.object().shape({
  firstName: Yup.string().min(2).max(50).required("First name is required"),
  lastName: Yup.string().min(2).max(50).required("Last name is required"),
  email: Yup.string().email("Invalid Email").required("Is Required"),
  message: Yup.string().min(5).required("Message is required"),
});

export default contactUsSchema;
