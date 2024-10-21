import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadItems } from '../Redux/Action';

const TotalItems = () => {
  let dispatch = useDispatch();
  const { items } = useSelector(state => state.data); // Get all items from Redux
  const userId = localStorage.getItem('userId'); // Get the logged-in user's ID

  useEffect(() => {
    dispatch(loadItems()); // Fetch items when component mounts
  }, [dispatch]);

  // Filter items to get only those that belong to the logged-in user
  const userItems = items.filter(item => item.userId === userId);
  
  // Calculate total and purchased items for the user
  const totalItems = userItems.length;
 

  return (
    
              <>{totalItems}</>
          
  );
};

export default TotalItems;
