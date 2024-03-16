import * as Yup from "yup";

const wizardSkillsSchema = Yup.object().shape({
    skills: Yup.array()
    .of(
        Yup.object().shape({
            value: Yup.number(),
            label: Yup.string(),
        })
    ).isRequired,
    experienceLevels: Yup.string()
    .required("This is Required"),
    years: Yup.number()
    .min(0),
    months: Yup.number()
    .min(1)
    .required(),
});

export default wizardSkillsSchema;