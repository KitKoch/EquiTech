import * as Yup from "yup";

const orgMemberFormSchema = Yup.object().shape({
  email: Yup.string().email("Invalid Email").required("Email Required"),
  firstName: Yup.string().min(2).max(100),
  lastName: Yup.string().min(2).max(100),
  userRoleTypeId: Yup.number().required("Please select an option"),
  positionTypeId: Yup.number().required("Please select a position "),
});

export default orgMemberFormSchema;
