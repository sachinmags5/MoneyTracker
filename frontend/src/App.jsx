
import './App.css'
import { useEffect , Profiler , lazy, Suspense  } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { Routes, Route } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./features/auth/Register";
// import {Dashboard} from "./features/dashboard/Dashboard";
// import Login from "./features/auth/Login";
const Dashboard = lazy(() => import("./features/dashboard/Dashboard"));
const Login = lazy(() => import("./features/auth/Login"));
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

    function onRenderCallback(
      id, // the "id" prop of the Profiler tree
      phase, // "mount" or "update"
      actualDuration, // time spent rendering
      baseDuration, // estimated time to render without memoization
      startTime, // when React started rendering
      commitTime, // when React committed the update
      interactions // interactions that triggered the update
    ) {
      //comented as of now
      // console.log(`[Profiler:${id}]`, { phase, actualDuration, baseDuration, startTime, commitTime, interactions, });
    }

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
      <Profiler id="AppRoutes" onRender={onRenderCallback}>
        <Suspense fallback={<div>Loading...!!!!!!!!!</div>}>
          <Routes>
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            {/* <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/users' element={<User />} />
            */}
            {/* Protected Routes */}
            <Route path="*" element={<div>Route Not Found</div>} />
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
        </Suspense>
      </Profiler>
      </BrowserRouter>
      <ToastContainer />
    </>
  )
}

export default App
