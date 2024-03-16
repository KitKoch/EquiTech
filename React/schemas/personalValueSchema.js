import * as Yup from "yup";

const formSchema = Yup.object().shape({
  personalValue: Yup.string().required("Choose a PersonalValue."),
  rank: Yup.number()
    .min(1)
    .max(100)
    .required("Ranking is Required. One is the Highest."),
});

const relatedPersonalValues = Yup.object().shape({
  personalValueA: Yup.number().required("Personal Value A is required"),
  personalValueB: Yup.number().required("Personal Value B is required"),
});

const personalValueSchema = { formSchema, relatedPersonalValues };
export default personalValueSchema;
