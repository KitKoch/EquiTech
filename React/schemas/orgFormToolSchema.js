import * as Yup from "yup";

let part1 = Yup.object().shape({
  organizationTypeId: Yup.number().required("Type Required"),
  name: Yup.string().min(2).required("Name Required"),
  headline: Yup.string().min(2).required("Headline Required"),
  description: Yup.string().min(2).required("Description Required"),
  logo: Yup.string().min(2).required("Logo Required"),
  phone: Yup.string()
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      "Phone number not valid"
    )
    .required("Phone number required"),
  siteUrl: Yup.string()
    .matches(
      /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
      "Url not valid"
    )
    .required("Url Required"),
});

const part2 = Yup.object().shape({
  locationTypeId: Yup.number().required("Location Type Required"),
  lineOne: Yup.string().min(2).max(255).required("Line One Required"),
  lineTwo: Yup.string(),
  city: Yup.string().min(1).max(225).required("City Required"),
  zip: Yup.string().min(1).max(50),
  stateId: Yup.number().required("State Required"),
});

const orgFormToolSchema = { part1, part2 };

export default orgFormToolSchema;
