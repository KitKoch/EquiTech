import * as Yup from "yup";

const shareStorySchema = Yup.object().shape({
    name: Yup.string().min(2).max(50).required("A Title is Required"),
    story: Yup.string().min(10).max(3000).required("Required"),
  });

  export default shareStorySchema;