export type Topic = {
  user_id: number;
  title: string;
  description?: string;
  id: number;
};

export type CreateTopic = {
  title: string;
  description: string;
  userId?: number;
  userLogin?: string;
};
