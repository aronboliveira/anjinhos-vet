import { inpType } from "./types";

export interface InpProps {
  id: {
    type: String;
    required: boolean;
    default: string;
  };
  lab: {
    type: String;
    required: boolean;
    default: string;
  };
  required?: {
    type: Boolean;
    required: boolean;
    default: boolean;
  };
  disabled?: {
    type: Boolean;
    required: boolean;
    default: boolean;
  };
  readOnly?: {
    type: Boolean;
    required: boolean;
    default: boolean;
  };
  opts?: string[] | { [k: string]: any };
  type?: string;
  autocomplete?: string;
}
export interface TypedInpProps extends InpProps {
  type: {
    type: inpType;
    required: boolean;
    default: String;
  };
}
export interface FilterInpProps extends TypedInpProps {
  minLength?: {
    type: Number;
    required: boolean;
    default: number;
  };
  maxLength?: {
    type: Number;
    required: boolean;
    default: number;
  };
  pattern?: {
    type: String;
    required: boolean;
    default: string;
  };
  autocomplete?: {
    type: String;
    required: boolean;
    default: string;
  };
  dataList?: {
    type: string[];
    required: boolean;
    default: Array;
  };
}
export interface FilterTextInpProps extends FilterInpProps {
  autocapitalize?: {
    type: Boolean;
    required: boolean;
    default: boolean;
  };
}
export interface FilterNumInpProps extends FilterInpProps {
  step?: {
    type: Number;
    required: boolean;
    default: number;
  };
}
export interface FilterCheckProps extends TypedInpProps {
  checked: {
    type: Boolean;
    required: boolean;
    default: boolean;
  };
}
export interface OptProps {
  value: string;
  text: string;
}
export interface OptGroupProps {
  lab: string;
  opts: OptProps[];
}
export interface FilterSelectProps extends InpProps {
  defV: string;
  type: "select-one" | "select-multiple";
  opts: OptProps[] | OptGroupProps[];
}
