import * as Yup from "yup";

const charitableFund = Yup.object().shape({
  name: Yup.string().min(2).max(100).required(),
  description: Yup.string().max(1000),
  url: Yup.string().url().required("Please enter website"),
});

const userFormSchema = { charitableFund };
export default userFormSchema;
