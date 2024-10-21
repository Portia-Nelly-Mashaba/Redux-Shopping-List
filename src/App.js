import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import AddItem from './Components/AddItem';
import EditItem from './Components/EditItem';
// import ViewItem from './Components/ViewItem';
import Register from './Components/Register';
import Login from './Components/Login';
import Profile from './Components/Profile';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/home' element={<Home />} />
        <Route path='/addItem' element={<AddItem />} />
        {/* <Route path='/editItem/:id' element={<EditItem />} />
        <Route path='/viewItem/:id' element={<ViewItem />} /> */}
        <Route path='/editItem/:id' element={<EditItem />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/register' element={<Register />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/' element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;

