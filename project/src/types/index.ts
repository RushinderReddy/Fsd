export interface User {
  id: string;
  username: string;
  email: string;
  isAdmin: boolean;
}

export interface Feedback {
  id: string;
  userId: string;
  username: string;
  category: string;
  title: string;
  description: string;
  status: FeedbackStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface FeedbackResponse {
  id: string;
  feedbackId: string;
  response: string;
  createdAt: Date;
}

export interface ProductChange {
  id: string;
  title: string;
  description: string;
  feedbackIds: string[];
  status: ProductChangeStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: string;
  name: string;
  description: string;
}

export type FeedbackStatus = 'pending' | 'in-review' | 'accepted' | 'rejected' | 'implemented';

export type ProductChangeStatus = 'planned' | 'in-progress' | 'completed';