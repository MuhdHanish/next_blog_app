export type TPost = {
  id: string;
  author: string;
  authorEmail?: string;
  title: string;
  content: string;
  category?: string;
  datePublished: string;
  links?: string[];
  thumbnail?: string;
};
