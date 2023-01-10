import { types } from "@src/configs";

import { ImageItemType, TagsItemType } from "./types";

export const formItems: (types.FormItemUnionType | types.ComplexItemType | ImageItemType | TagsItemType)[] = [
  {
    key: 'image',
    type: 'image',
    label: 'Image',
    required: true,
  },
  {
    key: 'title',
    type: 'text',
    label: 'Title',
    required: true,
    placeholder: 'Please input title.',
    rules: [
      {
        required: true,
        message: 'Please input title.',
      },
    ],
  },
  {
    key: 'writer',
    type: 'label',
    label: 'Writer',
    required: false,
  },
  {
    key: 'content',
    type: 'textarea',
    label: 'Content',
    required: true,
    placeholder: 'Please input content.',
    rules: [
      {
        required: true,
        message: 'Please input content.',
      },
    ],
  },
  {
    key: 'tags',
    type: 'tags',
    label: 'Tags',
    placeholder: 'Please enter tags.',
  },
];

export const messages = {
  modify: {
    confirm: 'Are you sure you want to edit?',
    success: 'Successfully changed.',
    error: 'A problem has occurred.',
  },
  remove: {
    confirm: 'Are you sure you want to remove?',
    success: 'Successfully removed.',
    error: 'A problem has occurred.',
  },
};