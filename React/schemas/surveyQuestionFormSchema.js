import * as Yup from "yup";

const surveyQuestionFormShcema = Yup.object().shape({
    question: Yup.string().min(2).max(500).required("Question is required"),
    helpText: Yup.string().min(2).max(255).required("Help text is required"),
    isRequired: Yup.bool().required("Required"),
    isMultipleAllowed: Yup.bool().required("Required"),
    questionTypeId: Yup.number().required("Question type is required"),
    statusId: Yup.number().required("Status is required"),
    sortOrder: Yup.number().required("Sort order is required"),
});

export default surveyQuestionFormShcema;