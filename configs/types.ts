import { Rule } from "antd/lib/form";
import { LiteralUnion } from "antd/lib/_util/type";

export interface FormItemType {
  key?: string;
  span?: number;
  type: 'select' | 'number' | 'password' | 'text' | 'textarea' | 'search' | 'checkbox' | 'radio' | 'switch' | 'label' | 'date' | 'daterange' | 'complex';
  label: string;
  required?: boolean;
  rules?: Rule[];
}

export enum ProjectListOf {
  NEWEST = "NEWEST",
  PAST = "PAST",
  PROMOTED = "PROMOTED",
  TODAY = "TODAY",
  UPCOMING = "UPCOMING",
  VERIFIED = "VERIFIED",
}


export interface SelectItemType extends FormItemType {
  type: 'select';
  placeholder?: string;
  defaultValue?: string;
  options: {
    label: string;
    value: string;
  }[];
}

export interface NumberItemType extends FormItemType {
  type: 'number';
  placeholder?: string;
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
  defaultValue?: number;
}

export interface PasswordItemType extends FormItemType {
  type: 'password';
  placeholder?: string;
  minLength?: number;
  maxLength?: number;
  defaultValue?: string;
}

export interface TextItemType extends FormItemType {
  inputType?: LiteralUnion<'button' | 'checkbox' | 'color' | 'date' | 'datetime-local' | 'email' | 'file' | 'hidden' | 'image' | 'month' | 'number' | 'password' | 'radio' | 'range' | 'reset' | 'search' | 'submit' | 'tel' | 'text' | 'time' | 'url' | 'week', string>;
  type: 'text';
  placeholder?: string;
  minLength?: number;
  maxLength?: number;
  suffix?: string;
  numberOnly?: boolean;
  defaultValue?: string;
}

export interface TextAreaItemType extends FormItemType {
  type: 'textarea';
  placeholder?: string;
  minLength?: number;
  maxLength?: number;
  defaultValue?: string;
  height?: number;
}

export interface SearchItemType extends FormItemType {
  type: 'search';
  searchButtonProps?: {
    label: string;
    primary?: boolean;
  };
  placeholder?: string;
  defaultValue?: string;
  minLength?: number;
  maxLength?: number;
  suffix?: string;
}

export interface CheckboxItemType extends FormItemType {
  type: 'checkbox';
  items: {
    label: string;
    value: string;
  }[];
  defaultValue?: string[];
}

export interface RadioItemType extends FormItemType {
  type: 'radio';
  items: {
    label: string;
    value: string;
  }[];
  defaultValue?: string;
}

export interface SwitchItemType extends FormItemType {
  type: 'switch';
  defaultValue?: boolean;
}

export interface LabelItemType extends FormItemType {
  type: 'label';
  defaultValue?: string;
}

export interface DateItemType extends FormItemType {
  type: 'date';
  picker?: 'date' | 'week' | 'month' | 'quarter' | 'year';
  placeholder?: string;
}

export interface DateRangeItemType extends FormItemType {
  type: 'daterange';
  picker?: 'date' | 'week' | 'month' | 'quarter' | 'year';
  placeholder?: [string, string];
}

export type FormItemUnionType =
  | SelectItemType
  | NumberItemType
  | PasswordItemType
  | TextItemType
  | TextAreaItemType
  | SearchItemType
  | CheckboxItemType
  | RadioItemType
  | SwitchItemType
  | LabelItemType
  | DateItemType
  | DateRangeItemType;

export interface ComplexItemType extends FormItemType {
  type: 'complex';
  gutter?: [number, number];
  children: (FormItemUnionType | ComplexItemType)[];
}