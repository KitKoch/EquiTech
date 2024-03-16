import * as Yup from "yup";

const appointmentSchema = Yup.object().shape({
    clientId: Yup.number().min(1, "A selection is required.").required("Client is required."),
    teamMemberId: Yup.number().min(1, "A selection is required.").required("Team Member is required."),
    locationId: Yup.number().min(1, "A selection is required.").required("Location is required."),
    statusTypesId: Yup.number().min(1, "A selection is required.").required("Appointment Status is required."),
    appointmentTypeId: Yup.number().min(1, "A selection is required.").required("Appointment Type is required."),
    appointmentStart: Yup.date().min(new Date().toLocaleString("en-US"), 'Start time must be greater than or equal to current local time.').required("Appointment Start Time is required."),
    appointmentEnd: Yup.date().when('appointmentStart', (appointmentStart, appointmentSchema)=>{
      if(appointmentStart){const afterStart = new Date(appointmentStart.getTime() + 1800000)
        return appointmentSchema.min(afterStart, 'End time must be at least 30 minutes or more after start time.')
      }
    }).required("Appointment End Time is required."),
    notes: Yup.string().min(2, 'Must enter more than 1 character.').max(1999, 'No more than 2000 characters can be entered.').nullable(),
    isConfirmed: Yup.bool()
  });

  export default appointmentSchema;