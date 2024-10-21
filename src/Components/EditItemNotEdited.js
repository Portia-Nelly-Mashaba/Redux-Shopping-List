import React, { useState } from 'react';
import { MDBIcon } from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addItem } from '../Redux/Action'


const AddItem = () => {

  const [ state, setState ] = useState ({
    item: "",
    quantity: "",
    unit: "",
    category: "",
  });

  const [error, setError] = useState("");
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const { item, quantity, unit, category}  = state;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!item || !quantity || !unit || !category) {
      setError("Please input all the fields");
    } else {
      dispatch(addItem(state))
      navigate('/'); 
      setError("");
    }
  };

  return (
    <div className="container">
      <h1>My ShopMate</h1>
      <div className="row">
        <div className="col-4">
          <div className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">Portia M</h5>
              <table className="table">
                <tbody>
                  <tr>
                    <td>Total List Items</td>
                    <td>2</td>
                  </tr>
                  <tr>
                    <td>Total Purchased</td>
                    <td>2</td>
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
              <p className="card-text">This is some text inside the second card body.</p>
            </div>
          </div>
        </div>
        <div className="col-8">
          <div className="card">
            <div className="card-body">
              <div className="card">
                <h5 className="card-header d-flex justify-content-start">Edit Item</h5>
                {error && <h5 className="card-body">{error}</h5>}
                <div className="card-body">
                  <form className="row g-3" onSubmit={handleSubmit}>
                    <div className="col-md-6">
                      <label className="form-label">Item</label>
                      <input value={item} onChange={handleInputChange} name='item' type="text" className="form-control" required />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Quantity</label>
                      <input value={quantity} onChange={handleInputChange} name='quantity' type="number" className="form-control" required />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label">Unit</label>
                      <select value={unit} onChange={handleInputChange} name='unit' className="form-select" required>
                        <option value="" selected>Choose units...</option>
                        <option value="pack">Pack</option>
                        <option value="bag">Bags</option>
                        <option value="liters">Liters</option>
                        <option value="kg">Kg</option>
                        <option value="units">Units</option>
                      </select>
                    </div>
                    <div className="col-md-4">
                      <label className="form-label">Category</label>
                      <select value={category} onChange={handleInputChange} name='category' className="form-select" required>
                        <option value="" selected>Choose Category...</option>
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
                    <div class="card-footer bg-body-tertiary px-3">
                      <div className='btn-group'>
                        <button onChange={handleInputChange} type="submit" class="btn btn-outline-success" data-mdb-ripple-init>UPDATE</button>
                        <Link to={'/home'} type="button" class="btn btn-outline-dark" data-mdb-ripple-init>BACK</Link>
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

export default AddItem;