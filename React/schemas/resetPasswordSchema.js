import * as Yup from "yup";

const resetPasswordSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
  });
  export default resetPasswordSchema;