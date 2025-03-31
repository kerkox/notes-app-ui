export interface LinkPreview {
  url: string;
  image: string;
  title: string;
}

export interface NoteRead {
  id: number;
  title: string;
  body: string;
  tags: Tag[];
  links: string[];
  linkPreviews: LinkPreview[];
}

export interface NoteCreate {
  id: number;
  title: string;
  body: string;
  tags: string[];
  links: string[];
  linkPreviews: LinkPreview[];
}

export interface Tag {
  id: number;
  name: string;
}
