import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // useNavigate for redirecting
import { v4 as uuidv4 } from 'uuid'; // For unique userId generation
import axios from 'axios';

function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate(); // For redirecting after success

  const registerHandle = async (e) => {
    e.preventDefault(); // Prevent page reload

    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    try {
      // Check if the email already exists in the JSON server
      const existingUsers = await axios.get(`http://localhost:8000/users?email=${email}`);
      if (existingUsers.data.length > 0) {
        alert('User with this email already exists');
        return;
      }

      // Generate unique userId
      const userId = uuidv4();

      // Prepare new user data
      const newUser = {
        userId,
        first_name: firstName,
        last_name: lastName,
        email,
        password,
      };

      // Save new user to JSON server
      await axios.post('http://localhost:8000/users', newUser);
      alert('User registered successfully');

      // Redirect to login screen after successful registration
      navigate('/login');

    } catch (error) {
      console.error('Error saving user:', error);
      alert('Error registering user');
    }
  };

  return (
    <section className="background-radial-gradient overflow-hidden">
      <style>{`
        .background-radial-gradient {
          background-color: hsl(218, 41%, 15%);
          background-image: radial-gradient(650px circle at 0% 0%,
              hsl(218, 41%, 35%) 15%,
              hsl(218, 41%, 30%) 35%,
              hsl(218, 41%, 20%) 75%,
              hsl(218, 41%, 19%) 80%,
              transparent 100%),
            radial-gradient(1250px circle at 100% 100%,
              hsl(218, 41%, 45%) 15%,
              hsl(218, 41%, 30%) 35%,
              hsl(218, 41%, 20%) 75%,
              hsl(218, 41%, 19%) 80%,
              transparent 100%);
        }
        #radius-shape-1 {
          height: 220px;
          width: 220px;
          top: -60px;
          left: -130px;
          background: radial-gradient(#44006b, #ad1fff);
          overflow: hidden;
        }
        #radius-shape-2 {
          border-radius: 38% 62% 63% 37% / 70% 33% 67% 30%;
          bottom: -60px;
          right: -110px;
          width: 300px;
          height: 300px;
          background: radial-gradient(#44006b, #ad1fff);
          overflow: hidden;
        }
        .bg-glass {
          background-color: hsla(0, 0%, 100%, 0.9) !important;
          backdrop-filter: saturate(200%) blur(25px);
        }
      `}</style>

      <div className="container px-4 py-5 px-md-5 text-center text-lg-start my-5">
        <div className="row gx-lg-5 align-items-center mb-5">
          <div className="col-lg-6 mb-5 mb-lg-0" style={{ zIndex: 10 }}>
            <h1 className="my-5 display-5 fw-bold ls-tight" style={{ color: 'hsl(218, 81%, 95%)' }}>
              Welcome New<br />
              <span style={{ color: 'hsl(218, 81%, 75%)' }}>User</span>
            </h1>
            <p className="mb-4 opacity-70" style={{ color: 'hsl(218, 81%, 85%)' }}>
              Please provide us with some information and we create an account for you to start having fun!
              We promise it will take short time.
            </p><br />
            <p className="mb-4 opacity-70" style={{ color: 'hsl(218, 81%, 85%)' }}>
              If you already have an account, go ahead click on <Link to={'/login'}>Login</Link>
            </p>
          </div>

          <div className="col-lg-6 mb-5 mb-lg-0 position-relative">
            <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
            <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>

            <div className="card bg-glass">
              <div className="card-body px-4 py-5 px-md-5">
                <form onSubmit={registerHandle}>
                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                        <input
                          type="text"
                          onChange={(e) => setFirstName(e.target.value)}
                          className="form-control"
                          value={firstName}
                        />
                        <label className="form-label">First name</label>
                      </div>
                    </div>
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                        <input
                          type="text"
                          onChange={(e) => setLastName(e.target.value)}
                          className="form-control"
                          value={lastName}
                        />
                        <label className="form-label">Last name</label>
                      </div>
                    </div>
                  </div>

                  <div className="form-outline mb-4">
                    <input
                      type="email"
                      onChange={(e) => setEmail(e.target.value)}
                      className="form-control"
                      value={email}
                    />
                    <label className="form-label">Email address</label>
                  </div>

                  <div className="form-outline mb-4">
                    <input
                      type="password"
                      onChange={(e) => setPassword(e.target.value)}
                      className="form-control"
                      value={password}
                    />
                    <label className="form-label">Password</label>
                  </div>

                  <div className="form-outline mb-4">
                    <input
                      type="password"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="form-control"
                      value={confirmPassword}
                    />
                    <label className="form-label">Confirm Password</label>
                  </div>

                  <button type="submit" className="btn btn-primary btn-block mb-4">
                    Sign up
                  </button>

                  <div className="text-center">
                    <p>or <Link to={'/login'}>Login</Link></p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Register;
