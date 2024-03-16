import * as Yup from "yup";

const newsletterSubscriptionSchema = 
  Yup.object().shape({
    email: Yup.string().email("Invalid email entered").required("Enter Email"),
  });

  export default newsletterSubscriptionSchema;