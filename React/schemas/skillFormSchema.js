import * as Yup from "yup";

const skillFormSchema = Yup.object().shape({
    name: Yup.string().min(2).max(100).required("Name is required"),
    description: Yup.string().min(2).max(500),
    industryId: Yup.number().required("Please pick an industry"),
});

export default skillFormSchema;