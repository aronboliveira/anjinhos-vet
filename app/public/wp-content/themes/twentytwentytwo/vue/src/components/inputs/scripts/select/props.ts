import { OptGroupProps, OptProps } from "../../../../scripts/declarations/interfaceComponents";
import { SelectProps } from "../../../../scripts/declarations/interfaces";
const selectProps: SelectProps = {
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
  defV: {
    type: String,
    required: false,
    default: "",
  },
  type: {
    type: String as () => "select-one" | "select-multiple",
    required: false,
    default: "select-one",
  },
  opts: {
    type: Array as () => OptProps[] | OptGroupProps[],
    required: true,
    default: () => [],
  },
  mv: {
    type: String,
    required: false,
    default: "",
  },
};
export default selectProps;
