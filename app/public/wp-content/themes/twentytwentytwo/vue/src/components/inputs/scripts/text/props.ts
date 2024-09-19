const textProps = {
  id: {
    type: String,
    required: true,
    default: "",
  },
  lab: {
    type: String,
    required: false,
    default: "",
  },
  minLength: {
    type: Number,
    required: false,
    default: 0,
  },
  maxLength: {
    type: Number,
    required: false,
    default: 4000,
  },
  pattern: {
    type: String,
    required: false,
    default: ".*",
  },
  autocomplete: {
    type: String,
    required: false,
    default: "none",
  },
  autocapitalize: {
    type: Boolean,
    required: false,
    default: false,
  },
  required: {
    type: Boolean,
    required: false,
    default: false,
  },
  disabled: {
    type: Boolean,
    required: false,
    default: false,
  },
  readOnly: {
    type: Boolean,
    required: false,
    default: false,
  },
  dataList: {
    type: Array as () => string[],
    required: false,
    default: [],
  },
};
export default textProps;
