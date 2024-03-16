import * as Yup from "yup";

const changePasswordSchema = Yup.object().shape({
  newPassword: Yup.string()
    .min(8, "Must contain at least 8 characters")
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&])/, {
      message:
        "Must contain a number, symbol, uppercase, and lowercase",
    })
    .max(50, "Must container fewer than 50 characters")
    .required("Required"),
  confirm: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "The passwords do not match")
    .required("Required"),
});

export default changePasswordSchema;
