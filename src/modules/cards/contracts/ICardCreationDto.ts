interface ICardCreationDto {
  name: string;
  description: string;
  type: string;
  blog: string;
  published_at?: Date | null;
  data: object;
}

export { ICardCreationDto };
