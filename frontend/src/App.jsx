
import './App.css'
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { Routes, Route } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./features/auth/Login";
import Register from "./features/auth/Register";
import {Dashboard} from "./features/dashboard/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import MyAppNav from './components/common/navbar.jsx';
import {Profile} from './features/dashboard/Profile.jsx'
import { MyAccount } from './features/dashboard/MyAccount.jsx';
import User from './features/user/User.jsx'
import { checkAuth } from "./features/auth/authApi";
import { ToastContainer, toast } from 'react-toastify';
import { CategoryList } from './features/category/CategoryList.jsx';
import {TransactionList} from "./features/transaction/TransactionList.jsx";

function App() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <>
    <BrowserRouter>
      <MyAppNav></MyAppNav>
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        {/* <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/users' element={<User />} />
         */}
         {/* Protected Routes */}
         
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/my-account" element={<MyAccount />} />
          <Route path="/category" element={<CategoryList />} />
          <Route path="/transaction" element={<TransactionList />} />
          <Route path="/users" element={<User />} />
        </Route>
        {/* <Route path="*" element={<Dashboard />} /> */}
      </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  )
}

export default App
