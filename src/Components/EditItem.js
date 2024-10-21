import React, { useState, useEffect } from 'react';
import { MDBIcon } from 'mdb-react-ui-kit';
import { Link, useNavigate, useParams } from 'react-router-dom';
import TotalItems from './TotalItems';
import TotalPurchased from './TotalPurchased';
import UserName from './UserName';
import Bio from './Bio';


const EditItem = () => {
  const [state, setState] = useState({
    item: "",
    quantity: "",
    unit: "",
    category: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  // Example: Retrieve logged-in user's userId from localStorage or another source
  const userId = localStorage.getItem('userId'); // Assuming userId is stored in localStorage after login

  // Fetch item details from JSON server when component loads
  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetch(`http://localhost:8000/shoppingList/${id}`);
        const data = await response.json();

        // Ensure the item belongs to the logged-in user
        if (data && data.userId === userId) {
          setState({
            item: data.item || "",
            quantity: data.quantity || "",
            unit: data.unit || "",
            category: data.category || "",
          });
        } else {
          setError("Unauthorized to edit this item.");
        }
      } catch (error) {
        console.error("Error fetching item:", error);
        setError("Error fetching item.");
      }
    };

    fetchItem();
  }, [id, userId]);

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  // Handle form submission and update the item in JSON server
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { item, quantity, unit, category } = state;

    if (!item || !quantity || !unit || !category) {
      setError("Please input all the fields");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/shoppingList/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          item,
          quantity,
          unit,
          category,
          userId, // Include the logged-in user's userId in the update request
        }),
      });

      if (response.ok) {
        navigate('/');
      } else {
        setError("Failed to update the item.");
      }
    } catch (error) {
      console.error("Error updating item:", error);
      setError("Error updating item.");
    }
  };
  return (
    <div className="container mt-5">
      
      <div className="row">
        <div className="col-4">
          <div className="card mb-3">
            <div className="card-body">
              <h5 className="card-title"><UserName /> </h5>
              <table className="table">
                <tbody>
                  <tr>
                    <td>Total List Items</td>
                    <td><TotalItems /></td>
                  </tr>
                  <tr>
                    <td>Total Purchased</td>
                    <td><TotalPurchased /></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">
                <MDBIcon icon="user-circle" className="me-2" />
                About Me
              </h5>
              <p className="card-text"><Bio /></p>
            </div>
          </div>
        </div>
        <div className="col-8">
          <div className="card">
            <div className="card-body">
              <div className="card">
                <h5 className="card-header d-flex justify-content-start">Edit Item</h5>
                
                <div className="card-body">
                  <form className="row g-3" onSubmit={handleSubmit}>
                    <div className="col-md-6">
                      <label className="form-label">Item</label>
                      <input id="item"
                        name="item"
                        value={state.item}
                        onChange={handleInputChange} type="text" className="form-control" required />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Quantity</label>
                      <input id="quantity"
                          name="quantity"
                          value={state.quantity}
                          onChange={handleInputChange} type="number" className="form-control" required />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label">Unit</label>
                      <select id="unit"
                          name="unit"
                          value={state.unit}
                          onChange={handleInputChange}  className="form-select" required>
                        <option value="">Choose units...</option>
                        <option value="pack">Pack</option>
                        <option value="bag">Bags</option>
                        <option value="liters">Liters</option>
                        <option value="kg">Kg</option>
                        <option value="units">Units</option>
                      </select>
                    </div>
                    <div className="col-md-4">
                      <label className="form-label">Category</label>
                      <select id="category"
                          name="category"
                          value={state.category}
                          onChange={handleInputChange} className="form-select" required>
                        <option value="">Choose Category...</option>
                        <option value="fruits">Fruits</option>
                        <option value="vegetables">Vegetables</option>
                        <option value="dairy">Dairy</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div className="col-md-4">
                      <label className="form-label">Image</label>
                      <input className="form-control" type="file" id="formFile" />
                    </div>
                    <div className="card-footer bg-body-tertiary px-3">
                      <div className="btn-group">
                     
                        <button type="submit" className="btn btn-outline-success">UPDATE</button>
                        <Link to="/home" className="btn btn-outline-dark">CLOSE</Link>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditItem;
