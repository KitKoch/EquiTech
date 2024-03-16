import * as Yup from "yup";

const commentFormSchema = Yup.object().shape({
  text: Yup.string().min(2).max(1000).required("Comment Is Required"),
});

export default commentFormSchema;
