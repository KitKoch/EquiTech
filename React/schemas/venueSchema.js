import * as Yup from "yup";

const venueFormSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Must be at least 2 characters")
    .max(255, "Cannot exceed 255 characters")
    .required("Name Required"),
  description: Yup.string()
    .min(5, "Must be at least 5 characters")
    .max(4000, "Cannot exceed 4000 characters")
    .required("Description Required"),
  locationId: Yup.number().required("Location Required"),
  url: Yup.string()
    .min(5, "Must be at least 5 characters")
    .max(255, "Cannot exceed 255 characters")
    .required("URL Required"),
});

const venueSchema = { venueFormSchema };

export default venueSchema;
