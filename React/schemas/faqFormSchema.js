import * as Yup from "yup";

const newFaqSchema = Yup.object().shape({
  question: Yup.string().required("Question is required"),
  answer: Yup.string().required("Answer is required"),
  categoryId: Yup.number().min(1).max(3).required("Category type is required"),
  sortorder: Yup.number()
    .min(1, "Please select a number higher than 0")
    .required("Sort order is required"),
});

export default newFaqSchema;
