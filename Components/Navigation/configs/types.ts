export interface Ioption {
  key: string;
  name: string;
  featured: boolean;
  link: string;
}

export interface Imenu {
  key: string;
  mainTitle: string;
  sideTitle: Ioption[];
}
