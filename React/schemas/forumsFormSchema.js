import * as Yup from "yup";

const forumsFormSchema = Yup.object().shape({
  name: Yup.string().required(),
  description: Yup.string().required(),
  forumCategoryId: Yup.number().required(),
  isPrivate: Yup.bool().required(),
});

export default forumsFormSchema;
