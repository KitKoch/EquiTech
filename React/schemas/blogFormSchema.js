import * as Yup from "yup";

const blogFormSchema = Yup.object().shape({
  blogTypeId: Yup.number().required("Required"),
  title: Yup.string().min(2).max(100).required("Required"),
  subject: Yup.string().min(2).max(50).required("Required"),
  content: Yup.string().min(10).max(4000),
  isPublished: Yup.boolean().required("Required"),
  imageUrl: Yup.string(),
  datePublished: Yup.string(),
});

export default { blogFormSchema };
