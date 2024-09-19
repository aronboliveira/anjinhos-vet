export interface ImgProps {
  src: string;
  alt: string;
  labTitle?: string;
  labDesc?: string;
  interv?: number;
}
export interface IdfProps {
  id: {
    type: PropType<string>;
    required: true;
    default: string;
  };
}
export interface FormProps extends IdfProps {
  action: {
    type: PropType<string>;
    required: true;
    default: string;
  };
  inps: {
    type: PropType<InpProps[]>;
    required: true;
    default: () => never[];
  };
}
export interface BaseInpProps extends IdfProps {
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
  defV?: {
    type: PropType<string>;
    required: false;
    default: string;
  };
}
export interface TextLikeProps extends BaseInpProps {
  minLength: {
    type: PropType<number>;
    required: false;
    default: number;
  };
  maxLength: {
    type: PropType<number>;
    required: false;
    default: number;
  };
  pattern: {
    type: PropType<string>;
    required: false;
    default: string;
  };
  autocomplete: {
    type: PropType<string>;
    required: false;
    default: string;
  };
  dataList: {
    type: PropType<string[]>;
    required: false;
    default: () => string[];
  };
}
export interface TextProps extends TextLikeProps {
  autocapitalize: {
    type: PropType<boolean>;
    required: false;
    default: boolean;
  };
}
export interface NumProps extends TextLikeProps {
  step: {
    type: PropType<number>;
    required: false;
    default: number;
  };
}
export interface SelectProps extends BaseInpProps {
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
export interface CheckProps extends BaseInpProps {
  checked: {
    type: PropType<boolean>;
    required: false;
    default: boolean;
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
