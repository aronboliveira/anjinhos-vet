import { PropType } from "vue";
import { OptGroupProps, OptProps } from "../../../../scripts/declarations/interfaceComponents";
export interface CheckProps {
  id: {
    type: PropType<string>;
    required: true;
    default: string;
  };
  lab: {
    type: PropType<string>;
    required: false;
    default: string;
  };
  required: {
    type: PropType<boolean>;
    required: false;
    default: boolean;
  };
  disabled: {
    type: PropType<boolean>;
    required: false;
    default: boolean;
  };
  readOnly: {
    type: PropType<boolean>;
    required: false;
    default: boolean;
  };
  checked: {
    type: PropType<boolean>;
    required: false;
    default: boolean;
  };
  defV: {
    type: PropType<string>;
    required: false;
    default: string;
  };
  type: {
    type: PropType<"select-one" | "select-multiple">;
    required: false;
    default: "select-one" | "select-multiple";
  };
  opts: {
    type: PropType<OptProps[] | OptGroupProps[]>;
    required: true;
    default: () => OptProps[] | OptGroupProps[];
  };
  mv: {
    type: PropType<string>;
    required: false;
    default: string;
  };
}
const checkProps = {
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
  required: {
    type: Boolean as PropType<boolean>,
    required: false,
    default: false,
  },
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
  checked: {
    type: Boolean as PropType<boolean>,
    required: false,
    default: false,
  },
  defV: {
    type: String as PropType<string>,
    required: false,
    default: "",
  },
  type: {
    type: String as PropType<"select-one" | "select-multiple">,
    required: false,
    default: "select-one",
  },
  opts: {
    type: Array as PropType<OptProps[] | OptGroupProps[]>,
    required: true,
    default: () => [],
  },
  mv: {
    type: String as PropType<string>,
    required: false,
    default: "",
  },
};

export default checkProps;
