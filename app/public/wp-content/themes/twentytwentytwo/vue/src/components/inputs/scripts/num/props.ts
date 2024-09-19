import { NumProps } from "../../../../scripts/declarations/interfaces";
const numProps: NumProps = {
  id: {
    type: String,
    required: true,
    default: "number",
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
    default: 5,
  },
  pattern: {
    type: String,
    required: false,
    default: "^[0-9]*$",
  },
  autocomplete: {
    type: String,
    required: false,
    default: "none",
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
    default: () => [],
  },
  step: {
    type: Number,
    required: false,
    default: 1,
  },
};
export default numProps;
