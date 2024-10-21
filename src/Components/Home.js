import React, { useEffect } from 'react';
import { MDBIcon } from 'mdb-react-ui-kit';
import { useSelector, useDispatch } from 'react-redux';
import { deleteItem, loadItems, updateItem } from '../Redux/Action'; 
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import TotalPurchased from './TotalPurchased';
import UserName from './UserName';
import Bio from './Bio';

const Home = () => {
  let dispatch = useDispatch();
  let navigate = useNavigate();

  const { items } = useSelector(state => state.data);
  const userId = localStorage.getItem('userId'); 

  useEffect(() => {
    dispatch(loadItems()); 
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete the item?')) {
      dispatch(deleteItem(id));
    }
  };

  
  const handleCheckboxChange = (item) => {
    const updatedItem = {
      ...item,
      purchased: !item.purchased,
    };
    console.log('Updated Item:', updatedItem);
    dispatch(updateItem(updatedItem));
    console.log('Dispatched updateItem');
  };
  
  const userItems = items.filter(item => item.userId === userId);

  return (
    <>
      <Navbar />
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
                      <td>{userItems.length}</td>
                    </tr>
                    <tr>
                      <td>Total Purchased</td>
                      <td><TotalPurchased /> </td>
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
                <div className="d-flex justify-content-end mb-3">
                  <button onClick={() => navigate('/addItem')} className="btn btn-dark btn-rounded">Add Item</button>
                </div>
                <table className="table table-responsive" style={{ maxWidth: '100%' }}>
                  <thead className="table-dark">
                    <tr>
                      <td></td>
                      <th>Item</th>
                      <th>Quantity</th>
                      <th>Unit</th>
                      <th>Category</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userItems.map((item, index) => (
                      <tr key={index}>
                        <td>
                          <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            checked={item.purchased || false} // Check if purchased
                            onChange={() => handleCheckboxChange(item)} // Handle change
                          />
                          </div>
                        </td>
                        <td>{item.item}</td>
                        <td>{item.quantity}</td>
                        <td>{item.unit}</td>
                        <td>{item.category}</td>
                        <td>
                          <div className="btn-group btn-group-sm" role="group" aria-label="Basic example">
                            <button onClick={() => navigate(`/editItem/${item.id}`)} type='button' className="btn btn-outline-success" data-mdb-ripple-init data-mdb-ripple-color="dark">Edit</button>
                            <button onClick={() => handleDelete(item.id)} type='button' className="btn btn-outline-danger" data-mdb-ripple-init data-mdb-ripple-color="dark">Delete</button>
                            <button onClick={() => navigate(`/editItem/${item.id}`)} type='button' className="btn btn-outline-dark" data-mdb-ripple-init data-mdb-ripple-color="dark">View</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
