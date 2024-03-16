import * as Yup from "yup";

const candidateLocationFormSchema = Yup.object().shape({
  
  sortOrder: Yup.number().min(1, "Provide an appropriate number").required("Is required"),
  isNegotiable: Yup.bool().required("Is required"),
});

export default candidateLocationFormSchema;