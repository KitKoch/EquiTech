import * as Yup from "yup";

const job = Yup.object().shape({
    title: Yup.string()
    .min(2, "Must be at least 2 characters")
    .max(200)
    .required(),
    description: Yup.string()
    .min(2, "Must be at least 2 characters")
    .max(4000)
    .required(),
    requirements: Yup.string()
    .min(2, "Must be at least 2 characters")
    .max(3000)
    .required(),
    jobTypeId: Yup.number().required("Is required"),
    jobStatusId: Yup.number().required("Is required"),
    organizationId: Yup.number().required("Is required"),
    locationId: Yup.number().required("Is required"),
    remoteStatusId:Yup.number().required("Is required"),
    contactName: Yup.string()
    .min(2, "Must be at least 2 characters")
    .max(200)
    .required(),
    contactPhone:Yup.string()
    .min(2, "Must be at least 2 characters")
    .max(20),
    contactEmail:Yup.string()
    .min(2, "Must be at least 2 characters")
    .max(200),
    estimatedStartDate: Yup.date(),
    estimatedFinishDate: Yup.date(),
}); 

const jobsFormSchema = { job };
export default jobsFormSchema;
