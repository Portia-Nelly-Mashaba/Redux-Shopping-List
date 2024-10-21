import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:8000/logout', {
        method: 'POST',  
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        localStorage.removeItem('authToken');
        navigate('/login');
      } else {
        console.error('Logout failed', response.status);
      }
    } catch (error) {
      console.error('An error occurred during logout', error);
    }
  };
  

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-body-tertiary">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link to={'/home'} className="navbar-brand" href="#">ShopMate</Link>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to={'/home'} className="nav-link active" aria-current="page" href="#">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={'/profile'}>Profile</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" onClick={handleLogout}>Logout</Link>
              </li>
            </ul>
            <form className="d-flex input-group w-auto">
              <input
                type="search"
                className="form-control"
                placeholder="Search Shopping List Item"
                aria-label="Search"
              />
              <button
                data-mdb-ripple-init
                className="btn btn-outline-primary"
                type="button"
                data-mdb-ripple-color="dark"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
