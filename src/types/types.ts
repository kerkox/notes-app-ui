export interface LinkPreview {
  url: string;
  image: string;
  title: string;
}

export interface Note {
  id: number;
  content: string;
  tags: string[];
  links: string[];
  linkPreviews: LinkPreview[];
}