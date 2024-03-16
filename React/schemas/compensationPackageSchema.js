import * as Yup from "yup";

const compensationPackageFormSchema = Yup.object().shape({
    organization: Yup.string().min(1, "Please Select an organization").required("Please select an organization"),
    name: Yup.string().min(2, "Name must be at least 2 characters").max(100, "Compensation Package Name cannot exceed 100 characters").required("Name is required"),
    description: Yup.string().min(2, "Description must be at least 2 characters").max(500, "Description cannot exceed 500 characters").required("Description is required"),
});

export default compensationPackageFormSchema;