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

export type Comment = {
  id: number;
  parentId: number | null;
  comment: string;
  topic_id: number;
  user_id: number;
  user_login: string;
};
