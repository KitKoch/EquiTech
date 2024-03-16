import * as Yup from "yup";

const UserEducationFormSchema = Yup.object().shape({
  schoolId: Yup.number(),
  educationLevelId: Yup.number().required("You must select an Education Level"),
  degrees: Yup.array(Yup.string()),
  description: Yup.string()
    .min(15, "The description must be at least 15 characters long")
    .max(500),
  startDate: Yup.date().required("Please select a valid Starting Date"),
  endDate: Yup.date()
    .nullable()
    .test(
      "is-after-start",
      "End date must be after the start date",
      function (endDate) {
        const { startDate } = this.parent;
        if (!startDate || !endDate) {
          return true;
        }
        return startDate <= endDate;
      }
    ),
});

export default UserEducationFormSchema;
