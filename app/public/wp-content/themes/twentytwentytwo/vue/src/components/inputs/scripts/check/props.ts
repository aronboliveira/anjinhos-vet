import { PropType } from "vue";
import { OptGroupProps, OptProps } from "../../../../scripts/declarations/interfaceComponents";
import { CheckProps } from "../../../../scripts/declarations/interfaces";
const checkProps: CheckProps = {
  id: {
    type: String as PropType<string>,
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
  checked: {
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
    type: String as PropType<"select-one" | "select-multiple">,
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

export default checkProps;
