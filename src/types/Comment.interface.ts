export interface Comment {
  content: string;
  createdAt?: Date;
  children?: Comment[];
}
