import React, { useEffect, useState } from 'react';

const Bio = () => {
  const [userDescription, setUserDescription] = useState('');
  const userId = localStorage.getItem('userId'); // Get the logged-in user's ID

  useEffect(() => {
    const fetchUserDescription = async () => {
      try {
        const response = await fetch(`http://localhost:8000/users/${userId}`); // Replace with your actual JSON server URL
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const user = await response.json();
        setUserDescription(user.description); // Assuming the field is 'description'
      } catch (error) {
        console.error('Error fetching user description:', error);
      }
    };

    fetchUserDescription();
  }, [userId]); // Dependency array

  return (
    <>
      {userDescription}
    </>
  );
};

export default Bio;
