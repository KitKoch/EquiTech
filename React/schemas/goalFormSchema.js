import * as Yup from "yup";

const goalFormSchema = Yup.object().shape({
  name: Yup.string().min(2).max(100).required("Is Required"),
  statement: Yup.string().min(2).max(500).required("Is Required"),
  minimumPay: Yup.number().min(1).max(999999.99).required("Is Required"),
  desiredPay: Yup.number().min(1).max(999999.99).required("Is Required"),
  isHourly: Yup.bool(),
  priority: Yup.number().min(1).max(3).required("Is Required"),
  yearsToGoal: Yup.number().min(1).max(10).required("Is Required"),
});

export default goalFormSchema;
