interface IArticleCreationDto {
  title: string;
  body: object;
  blog: string;
  author: string;
  published_at?: Date | null;
}

export { IArticleCreationDto };
