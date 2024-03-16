import * as Yup from "yup";

const NewslettersValidationSchema = Yup.object().shape({
    templateId: Yup.number().min(1, "You must select a Template").required(),
    categoryId: Yup.number().min(1, "You must select a Category").required(),
    name: Yup.string().required("The name is Required"),
    isSubscribed: Yup.bool(),
    coverPhoto: Yup.string(),
    description: Yup.string().min(15, "We need at least 5 characters").max(255,"Too long."),
    dateToPublish: Yup.date(),
    dateToExpire: Yup.date(),
    contents: Yup.array(),
})

export default NewslettersValidationSchema;