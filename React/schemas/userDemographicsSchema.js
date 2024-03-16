import * as Yup from "yup";

const userDemoSchema = Yup.object().shape({
  preferredName: Yup.string().required("Preferred Name is required"),
  pronunciation: Yup.string().required("Pronunciation is required"),
  aboutMe: Yup.string().required("About Me is required"),
  genderId: Yup.number().required("Gender is required"), // the only one that is not null
});

export default userDemoSchema;
