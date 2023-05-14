interface IResponseUserDto {
  id: string;
  name: string | null;
  email: string;
  bio: string | null;
  status: string;
  created_at: Date
  updated_at: Date
}

export { IResponseUserDto }
