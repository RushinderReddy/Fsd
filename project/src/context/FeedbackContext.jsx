import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

// Mock data
const INITIAL_CATEGORIES = [
  { id: '1', name: 'UI/UX', description: 'User interface and experience issues or suggestions' },
  { id: '2', name: 'Feature Request', description: 'Requests for new features or enhancements' },
  { id: '3', name: 'Bug Report', description: 'Reports of bugs or issues in the product' },
  { id: '4', name: 'Performance', description: 'Issues related to application performance' },
];

const INITIAL_FEEDBACKS = [
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

const INITIAL_RESPONSES = [
  {
    id: '1',
    feedbackId: '2',
    response: 'We love this idea! We\'ve added it to our roadmap for the next quarter.',
    createdAt: new Date('2023-02-15'),
  },
];

const INITIAL_PRODUCT_CHANGES = [
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

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [feedbacks, setFeedbacks] = useState(INITIAL_FEEDBACKS);
  const [responses, setResponses] = useState(INITIAL_RESPONSES);
  const [productChanges, setProductChanges] = useState(INITIAL_PRODUCT_CHANGES);
  const [categories, setCategories] = useState(INITIAL_CATEGORIES);

  const submitFeedback = (feedbackData) => {
    const newFeedback = {
      id: `${feedbacks.length + 1}`,
      ...feedbackData,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setFeedbacks([...feedbacks, newFeedback]);
  };

  const respondToFeedback = (responseData) => {
    const newResponse = {
      id: `${responses.length + 1}`,
      ...responseData,
      createdAt: new Date(),
    };

    setResponses([...responses, newResponse]);

    // Update feedback status
    setFeedbacks(
      feedbacks.map((feedback) =>
        feedback.id === responseData.feedbackId
          ? { ...feedback, status: 'in-review', updatedAt: new Date() }
          : feedback
      )
    );
  };

  const addCategory = (categoryData) => {
    const newCategory = {
      id: `${categories.length + 1}`,
      ...categoryData,
    };

    setCategories([...categories, newCategory]);
  };

  const addProductChange = (changeData) => {
    const newProductChange = {
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
          ? { ...feedback, status: 'implemented', updatedAt: new Date() }
          : feedback
      )
    );
  };

  const getUserFeedbacks = (userId) => {
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

FeedbackProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export const useFeedback = () => {
  const context = useContext(FeedbackContext);
  if (context === undefined) {
    throw new Error('useFeedback must be used within a FeedbackProvider');
  }
  return context;
};