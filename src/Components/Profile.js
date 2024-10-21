import React, { useEffect, useState } from 'react'; 
import UserName from './UserName'; // Import UserName component
import { Link } from 'react-router-dom';

const Profile = () => {
  const [userDetails, setUserDetails] = useState({});
  const [description, setDescription] = useState('');
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8000/users/${userId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const user = await response.json();
        setUserDetails(user);
        setDescription(user.description || ''); // Initialize description if it exists
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
    fetchUserDetails();
  }, [userId]);

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(`http://localhost:8000/users/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description }),
      });
      alert('Description updated successfully!');
    } catch (error) {
      console.error('Error updating description:', error);
    }
  };

  return (
    <div className="container mt-5">
    <div className="d-flex justify-content-center">
      <div className="col-10">
        <div className="card">
            <Link to={'/home'}>
            <button 
            className="btn btn-outline-dark" 
            style={{ position: 'absolute', top: '10px', left: '10px' }} 
          >
            Back
          </button>
          </Link>
          
          
          <h5 className="card-header d-flex justify-content-end">My Account</h5>
          <div className="card-body">
            <p><strong>Full Name:</strong> {userDetails.first_name}</p>
            <p><strong>Surname:</strong> {userDetails.last_name}</p>
            <p><strong>Email:</strong> {userDetails.email}</p>
            <p><strong>Bio:</strong> {userDetails.description}</p>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="description">About Me:</label>
                <textarea
                  id="description"
                  className="form-control"
                  value={description}
                  onChange={handleDescriptionChange}
                />
              </div>
              <button type="submit" className="btn btn-primary mt-2">Update My Bio</button>
            </form>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Profile;
