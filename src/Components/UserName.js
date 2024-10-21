import React, { useEffect, useState } from 'react';

const UserName = () => {
  const [userName, setUserName] = useState('');
  const userId = localStorage.getItem('userId'); // Get the logged-in user's ID

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const response = await fetch(`http://localhost:8000/users/${userId}`); // Replace with your actual JSON server URL
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const user = await response.json();
        setUserName(user.first_name); // Assuming the field is 'first_name'
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUserName();
  }, [userId]); // Dependency array

  return (
    <>
      {userName}
    </>
  );
};

export default UserName;
