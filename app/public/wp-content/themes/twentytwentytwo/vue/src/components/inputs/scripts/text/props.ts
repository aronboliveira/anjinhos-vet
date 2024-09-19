import { TextProps } from "react-native-svg";
import { PropType } from "vue";
const textProps: TextProps = {
  //@ts-ignore
  id: {
    type: String as PropType<string>,
    required: true,
    default: "",
  },
  lab: {
    type: String as PropType<string>,
    required: false,
    default: "",
  },
  minLength: {
    type: Number as PropType<number>,
    required: false,
    default: 0,
  },
  maxLength: {
    type: Number as PropType<number>,
    required: false,
    default: 4000,
  },
  pattern: {
    type: String as PropType<string>,
    required: false,
    default: ".*",
  },
  autocomplete: {
    type: String as PropType<string>,
    required: false,
    default: "none",
  },
  autocapitalize: {
    type: Boolean as PropType<boolean>,
    required: false,
    default: false,
  },
  required: {
    type: Boolean as PropType<boolean>,
    required: false,
    default: false,
  },
  //@ts-ignore
  disabled: {
    type: Boolean as PropType<boolean>,
    required: false,
    default: false,
  },
  readOnly: {
    type: Boolean as PropType<boolean>,
    required: false,
    default: false,
  },
  dataList: {
    type: Array as PropType<string[]>,
    required: false,
    default: () => [],
  },
};
export default textProps;
