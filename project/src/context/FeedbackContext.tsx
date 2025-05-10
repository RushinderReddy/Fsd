import React, { createContext, useContext, useState } from 'react';
import { Feedback, FeedbackResponse, ProductChange, Category } from '../types';

interface FeedbackContextType {
  feedbacks: Feedback[];
  responses: FeedbackResponse[];
  productChanges: ProductChange[];
  categories: Category[];
  submitFeedback: (feedback: Omit<Feedback, 'id' | 'createdAt' | 'updatedAt'>) => void;
  respondToFeedback: (response: Omit<FeedbackResponse, 'id' | 'createdAt'>) => void;
  addCategory: (category: Omit<Category, 'id'>) => void;
  addProductChange: (change: Omit<ProductChange, 'id' | 'createdAt' | 'updatedAt'>) => void;
  getUserFeedbacks: (userId: string) => Feedback[];
}

// Mock data
const INITIAL_CATEGORIES: Category[] = [
  { id: '1', name: 'UI/UX', description: 'User interface and experience issues or suggestions' },
  { id: '2', name: 'Feature Request', description: 'Requests for new features or enhancements' },
  { id: '3', name: 'Bug Report', description: 'Reports of bugs or issues in the product' },
  { id: '4', name: 'Performance', description: 'Issues related to application performance' },
];

const INITIAL_FEEDBACKS: Feedback[] = [
  {
    id: '1',
    userId: '1',
    username: 'user',
    category: 'UI/UX',
    title: 'Improve button contrast',
    description: 'The buttons are hard to see on the dashboard page',
    status: 'pending',
    createdAt: new Date('2023-01-15'),
    updatedAt: new Date('2023-01-15'),
  },
  {
    id: '2',
    userId: '1',
    username: 'user',
    category: 'Feature Request',
    title: 'Add dark mode',
    description: 'Would love to have a dark mode option for eye comfort',
    status: 'accepted',
    createdAt: new Date('2023-02-10'),
    updatedAt: new Date('2023-02-15'),
  },
];

const INITIAL_RESPONSES: FeedbackResponse[] = [
  {
    id: '1',
    feedbackId: '2',
    response: 'We love this idea! We\'ve added it to our roadmap for the next quarter.',
    createdAt: new Date('2023-02-15'),
  },
];

const INITIAL_PRODUCT_CHANGES: ProductChange[] = [
  {
    id: '1',
    title: 'Dark Mode Implementation',
    description: 'Adding dark mode support across all pages',
    feedbackIds: ['2'],
    status: 'in-progress',
    createdAt: new Date('2023-02-20'),
    updatedAt: new Date('2023-03-01'),
  },
];

const FeedbackContext = createContext<FeedbackContextType | undefined>(undefined);

export const FeedbackProvider: React.FC<{ children: React.ReactNode }> = ({ 
  children 
}) => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>(INITIAL_FEEDBACKS);
  const [responses, setResponses] = useState<FeedbackResponse[]>(INITIAL_RESPONSES);
  const [productChanges, setProductChanges] = useState<ProductChange[]>(INITIAL_PRODUCT_CHANGES);
  const [categories, setCategories] = useState<Category[]>(INITIAL_CATEGORIES);

  const submitFeedback = (feedbackData: Omit<Feedback, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newFeedback: Feedback = {
      id: `${feedbacks.length + 1}`,
      ...feedbackData,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setFeedbacks([...feedbacks, newFeedback]);
  };

  const respondToFeedback = (responseData: Omit<FeedbackResponse, 'id' | 'createdAt'>) => {
    const newResponse: FeedbackResponse = {
      id: `${responses.length + 1}`,
      ...responseData,
      createdAt: new Date(),
    };

    setResponses([...responses, newResponse]);

    // Update feedback status
    setFeedbacks(
      feedbacks.map((feedback) =>
        feedback.id === responseData.feedbackId
          ? { ...feedback, status: 'in-review' as const, updatedAt: new Date() }
          : feedback
      )
    );
  };

  const addCategory = (categoryData: Omit<Category, 'id'>) => {
    const newCategory: Category = {
      id: `${categories.length + 1}`,
      ...categoryData,
    };

    setCategories([...categories, newCategory]);
  };

  const addProductChange = (changeData: Omit<ProductChange, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newProductChange: ProductChange = {
      id: `${productChanges.length + 1}`,
      ...changeData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setProductChanges([...productChanges, newProductChange]);

    // Update feedback status for all associated feedbacks
    setFeedbacks(
      feedbacks.map((feedback) =>
        changeData.feedbackIds.includes(feedback.id)
          ? { ...feedback, status: 'implemented' as const, updatedAt: new Date() }
          : feedback
      )
    );
  };

  const getUserFeedbacks = (userId: string) => {
    return feedbacks.filter((feedback) => feedback.userId === userId);
  };

  return (
    <FeedbackContext.Provider
      value={{
        feedbacks,
        responses,
        productChanges,
        categories,
        submitFeedback,
        respondToFeedback,
        addCategory,
        addProductChange,
        getUserFeedbacks,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export const useFeedback = (): FeedbackContextType => {
  const context = useContext(FeedbackContext);
  if (context === undefined) {
    throw new Error('useFeedback must be used within a FeedbackProvider');
  }
  return context;
};