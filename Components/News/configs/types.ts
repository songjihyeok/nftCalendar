export interface ImageItemType {
  type: 'image',
  key?: string;
  label: string;
  required?: boolean;
}

export interface TagsItemType {
  type: 'tags',
  key?: string;
  label: string;
  placeholder?: string;
}