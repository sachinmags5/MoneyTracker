import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";

import { store } from './app/store'
import { Provider } from 'react-redux'

import './index.css'
import App from './App.jsx'
import Register from "./features/register/Register.jsx";
import Login from "./features/login/Login.jsx"
import User from "./features/user/User.jsx";
import {MyAppNav} from './components/common/navbar.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <MyAppNav></MyAppNav>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/users' element={<User />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
