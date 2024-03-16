import * as Yup from "yup";


const job = Yup.object().shape({

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
})
const jobsFormSchemaPart3 = { job }
export default jobsFormSchemaPart3 