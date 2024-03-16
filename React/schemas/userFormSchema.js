import * as Yup from "yup";

const signUp = Yup.object().shape({
  email: Yup.string().email().required(),
  firstName: Yup.string()
    .min(2, "First Name must be at least 2 characters")
    .max(100)
    .required(),
  lastName: Yup.string()
    .min(2, "Last Name must be at least 2 characters")
    .max(100)
    .required(),
  mi: Yup.string().max(2),
  avatarUrl: Yup.string().max(255),
  password: Yup.string()
    .min(8)
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&])/, {
      message: "Must contain a number, symbol, uppercase, and lowercase",
    })
    .max(50)
    .required(),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref("password"), null], "The Passwords do not match")
    .required(),
});

const signIn = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().required(),
});

const inviteSignUp = Yup.object().shape({
  password: Yup.string()
    .min(8)
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&])/, {
      message: "Must contain a number, symbol, uppercase, and lowercase",
    })
    .max(50)
    .required(),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref("password"), null], "The Passwords do not match")
    .required(),
});

const userFormSchema = { signUp, signIn, inviteSignUp };
export default userFormSchema;
