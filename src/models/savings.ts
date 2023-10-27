export interface ISaving {
  id: string;
  userId: string;
  category: string;
  description?: string;
  value: number;
  attachment?: string;
  isFixed: boolean;
  comments?: string;
  createdAt: Date;
}
