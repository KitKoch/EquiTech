import * as Yup from "yup";

const compensationElementFormSchema = Yup.object().shape({
  packageElements: Yup.array().of(
    Yup.object().shape({
      value: Yup.string()
        .required("Value is required.")
        .matches(
          /(?=.*?\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|\d+)?(\.\d{1,2})?$/,
          "Must be a valid number"
        ),

      label: Yup.number()
        .required("Label is required.")
        .moreThan(0, "Must select one of the labels."),
    })
  ),
});

export default compensationElementFormSchema;
