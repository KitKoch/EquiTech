import * as Yup from "yup";

const threadReplySchema = Yup.object().shape({
  subject: Yup.string().required(),
});

export default threadReplySchema;
