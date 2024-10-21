import React from 'react';
import { useSelector } from 'react-redux';

const TotalPurchased = () => {
  // Get the current user's ID from local storage
  const userId = localStorage.getItem('userId');

  // Access items from the Redux store
  const { items } = useSelector(state => state.data);

  // Filter items to only include those belonging to the current user
  const userItems = items.filter(item => item.userId === userId);

  // Calculate the total number of purchased items
  const totalPurchased = userItems.filter(item => item.purchased).length;

  return (
    <>
      
        {totalPurchased}
  
    </>
  );
};

export default TotalPurchased;
