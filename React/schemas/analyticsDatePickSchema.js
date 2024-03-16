import * as Yup from "yup";

const analyticsDatePickSchema = Yup.object().shape({
  startDate: Yup.date().required("Please select a start date"),
  endDate: Yup.date().required("Please select an end date"),
});

export default analyticsDatePickSchema;
