import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // useNavigate for redirection
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // To redirect the user

  const loginHandle = async (e) => {
    e.preventDefault(); // Prevent page reload

    try {
      // Fetch user data from JSON server to check for matching credentials
      const response = await axios.get(`http://localhost:8000/users?email=${email}&password=${password}`);

      if (response.data.length > 0) {
        // Save user information (userId) to localStorage
        const user = response.data[0]; // Assuming the user object is the first one in the array
        localStorage.setItem('userId', user.id); // Save the userId to localStorage

        // If email and password match, redirect to /home
        alert('Login successful!');
        navigate('/home');
      } else {
        alert('Invalid email or password');
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('Error logging in, please try again.');
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
              Shopping List <br />
            </h1>
            <p className="mb-4 opacity-70" style={{ color: 'hsl(218, 81%, 85%)' }}>
              This is an application that allows you to record and share things you want to spend your money on
              and keep track of your shopping lists.
            </p><br />
            <p className="mb-4 opacity-70" style={{ color: 'hsl(218, 81%, 85%)' }}>
              If you do not have an account, go ahead click on <Link to={'/register'}>Sign Up</Link>
            </p>
          </div>

          <div className="col-lg-6 mb-5 mb-lg-0 position-relative">
            <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
            <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>

            <div className="card bg-glass">
              <div className="card-body px-4 py-5 px-md-5">
                <form onSubmit={loginHandle}>
                  <div className="form-outline mb-4">
                    <input
                      type="email"
                      id="form3Example3"
                      className="form-control"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <label className="form-label" htmlFor="form3Example3">Email address</label>
                  </div>

                  <div className="form-outline mb-4">
                    <input
                      type="password"
                      id="form3Example4"
                      className="form-control"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <label className="form-label" htmlFor="form3Example4">Password</label>
                  </div>

                  <button type="submit" className="btn btn-primary btn-block mb-4">
                    LOGIN
                  </button>

                  <div className="text-center">
                    <p>or <Link to={'/register'}>Sign Up</Link></p>
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

export default Login;
