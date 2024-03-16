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
   
})
const jobsFormSchemaPart1 = { job }
export default jobsFormSchemaPart1 

