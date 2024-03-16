import * as Yup from "yup";


const job = Yup.object().shape({

jobTypeId: Yup.number().required("Is required"),
jobStatusId: Yup.number().required("Is required"),
organizationId: Yup.number().required("Is required"),
locationId: Yup.number().required("Is required"),
remoteStatusId:Yup.number().required("Is required"),


});
const jobsFormSchemaPart2 = { job }
export default jobsFormSchemaPart2 