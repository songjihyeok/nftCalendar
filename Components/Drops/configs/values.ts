import { types } from "@src/configs";
import { ImageItemType, TagsItemType } from "./types";

export const columns = [
  {
    key: 'id',
    title: 'ID',
    dataIndex: ['id'],
  },
  // {
  //   key: 'coverImage',
  //   title: 'Cover Image',
  //   dataIndex: ['coverImage'],
  // },
  {
    key: 'title',
    title: '제목',
    dataIndex: ['title'],
  },
  {
    key: 'startDateTime',
    title: '이벤트 시작 날짜',
    dataIndex: ['startDateTime'],
  },
  {
    key: 'endDateTime',
    title: '이벤트 종료 날짜',
    dataIndex: ['endDateTime'],
  },
  {
    key: 'createdDateTime',
    title: '이벤트 등록 날짜',
    dataIndex: ['createdDateTime'],
  },
  {
    key: 'transactionHash',
    title: '송금 내역',
    dataIndex: ['transactionHash'],
    width: 200
  },
  {
    key: 'isPromoted',
    title: 'Promoted',
    dataIndex: ['isPromoted'],
  },
  {
    key: 'isVerified',
    title: 'Verified',
    dataIndex: ['isVerified'],
  },
  {
    key: 'isVisible',
    title: 'visible',
    dataIndex: ['isVisible'],
  },
  {
    key: 'detail',
    title: '자세히 보기',
    dataIndex: ['detail'],
  },

  {
    key: 'remove',
    title: '삭제',
    dataIndex: ['remove'],
  }
];

export const formItems: (types.FormItemUnionType | types.ComplexItemType | ImageItemType | TagsItemType)[] = [
  {
    key: 'image',
    type: 'image',
    label: 'Cover Image',
    required: true,
  },
  {
    key: 'title',
    type: 'text',
    label: 'Title',
    required: true,
    placeholder: 'Please enter',
    rules: [
      {
        required: true,
        message: 'Please enter.',
      },
    ],
  },
  {
    key: 'email',
    type: 'text',
    label: 'Email',
    required: true,
    placeholder: 'Please enter',
    inputType: 'email',
    rules: [
      {
        required: true,
        message: 'Please enter.',
      },
      {
        type: 'email',
        message: "It doesn't fit the email format.",
      },
    ],
  },
  {
    key: 'description',
    type: 'textarea',
    label: 'Description',
    required: true,
    placeholder: 'Please enter',
    height: 150,
    rules: [
      {
        required: true,
        message: 'Please enter.',
      },
    ],
  },
  {
    key: 'isPromoted',
    type: 'switch',
    label: 'Is promoted?',
    defaultValue: false,
  },
  {
    key: 'isVerified',
    type: 'switch',
    label: 'Is verified?',
    defaultValue: false,
  },
  {
    key: 'mintingPrice',
    type: 'text',
    label: 'Minting Price',
    required: true,
    placeholder: 'Please enter',
    suffix: 'USD',
    numberOnly: true,
    rules: [
      {
        required: true,
        message: 'Please enter.',
      },
    ],
  },
  {
    key: 'numberOfMinting',
    type: 'number',
    label: 'Number of Minting',
    required: true,
    placeholder: 'Please enter',
    rules: [
      {
        required: true,
        message: 'Please enter.',
      },
    ],
  },
  {
    key: 'startEndDateTime',
    type: 'daterange',
    label: 'Start ~ End DateTime',
    placeholder: ['YYYY-MM-DD', 'YYYY-MM-DD'],
  },
  {
    key: 'marketplaceId',
    type: 'number',
    label: 'Marketplace ID',
    required: true,
    placeholder: 'Please enter',
    rules: [
      {
        required: true,
        message: 'Please enter.',
      },
    ],
  },
  {
    key: 'blockchainId',
    type: 'number',
    label: 'Blockchain ID',
    required: true,
    placeholder: 'Please enter',
    rules: [
      {
        required: true,
        message: 'Please enter.',
      },
    ],
  },
  {
    key: 'transactionHash',
    type: 'text',
    label: 'Transaction Hash',
    placeholder: 'Please enter',
  },
  {
    key: 'websiteUrl',
    type: 'text',
    label: 'Web Site URL',
    required: true,
    placeholder: 'Please enter',
    rules: [
      {
        required: true,
        message: 'Please enter.',
      },
    ],
  },
  {
    key: 'announcementUrl',
    type: 'text',
    label: 'Announcement URL',
    placeholder: 'Please enter',
  },
  {
    key: 'marketplaceUrl',
    type: 'text',
    label: 'Marketplace URL',
    placeholder: 'Please enter',
  },
  {
    key: 'discordUrl',
    type: 'text',
    label: 'Discord URL',
    placeholder: 'Please enter',
  },
  {
    key: 'twitterUrl',
    type: 'text',
    label: 'Twitter URL',
    placeholder: 'Please enter',
  },
  {
    key: 'tags',
    type: 'tags',
    label: 'Tags',
  },
];

export const messages = {
  create: {
    confirm: 'Are you sure you want to create?',
    success: 'Successfully created.',
    error: 'A problem has occurred.',
  },
  modify: {
    confirm: 'Are you sure you want to edit?',
    success: 'Successfully changed.',
    error: 'A problem has occurred.',
  },
  remove: {
    confirm: 'Do you want to remove?',
    success: 'Successfully removed',
    error: 'A problem has occurred.',
  },
};