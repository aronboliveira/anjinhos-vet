import { PropType } from "vue";
import { InpProps } from "../../../scripts/declarations/interfaceComponents";
export interface FormProps {
  id: {
    type: PropType<string>;
    required: boolean;
    default: string;
  };
  action: {
    type: PropType<string>;
    required: boolean;
    default: string;
  };
  inps: {
    type: PropType<InpProps[]>;
    required: boolean;
    default: () => never[];
  };
}
const FilterFormProps: FormProps = {
  id: {
    type: String as PropType<string>,
    required: true,
    default: "",
  },
  action: {
    type: String as PropType<string>,
    required: true,
    default: "/",
  },
  inps: {
    type: Array as PropType<InpProps[]>,
    required: true,
    default: () => [],
  },
};
export default FilterFormProps;
