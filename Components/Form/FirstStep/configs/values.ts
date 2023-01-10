export const values = {
  event: {
    title: {
      name: "title",
      label: "Event Title",

      rules: [{ min: 3, message: "Title should be longer than 3 characters" }, { required: true, message: "type your event title" }],
    },
    description: {
      name: "description",
      label: "Event Description(Content)",

      rules: [{ min: 3, message: "Description should be longer than 3 characters" }, { required: true, message: "type your event description" }],
    },
  },
  date: {
    mainTitle: "Date",
    start: {
      name: "startDateTime",
      label: "select Start Date",
      inputType: "date",
      placeholder: "year month day",
      rules: [{ required: true, message: "select your event start day" }],
    },
    end: {
      name: "endDateTime",
      label: "select End Date",
      inputType: "date",
      rules: [{ required: true, message: "select your event end day" }],
    },
  },
};