import * as Yup from "yup";

const educationRequirementsSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Please fill out rest of name.")
    .max(500)
    .required("Please fill out the name."),
  description: Yup.string()
    .min(15, "The desctiption must be at least 15 characters long")
    .max(500),
  educationLevelId: Yup.string().required("Education level is required."),
  degreeId: Yup.string().required("Degree is required."),
  isExperienceAllowed: Yup.string().required("Please select an option."),
  minYears: Yup.string().required("Years have not been selected."),
});

export default educationRequirementsSchema;
