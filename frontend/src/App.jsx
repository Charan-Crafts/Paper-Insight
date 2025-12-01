// App.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomeLayout from './Pages/Home/HomeLayout';
import LoginPage from './Pages/Home/LoginPage';
import RegisterPage from './Pages/Home/RegisterPage';
import HomePage from './Pages/Home/HomePage';
import { toast, ToastContainer } from "react-toastify";
import UserLayout from './Pages/User/UserLayout';
import UserDashboard from './Pages/User/UserDashboard';
import Searchpapers from './Pages/User/Searchpapers';
import SavedPapers from './Pages/User/SavedPapers';
import ResearchChatPage from './Pages/User/ResearchChatPage';
import ProtectedRoutes from './ProtectedRoutes';
import { checkAuthStatus } from './redux/slice/authSlice';
import {useDispatch , useSelector} from 'react-redux'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from './Pages/Admin/AdminLayout';
const App = () => {

  const dispatch = useDispatch();
  
  const navigate = useNavigate();
  const {isAuthenticated , user} = useSelector((state) => state.auth);


  useEffect(()=>{

    dispatch(checkAuthStatus())
    .then((response)=>{
      console.log("Auth status checked:", response);
      if(response.payload ==="Unauthorized access - No token provided"){
        toast.info("Please log in to continue.");
        navigate("/login");
        return;
      }
      if(response.payload.isAuthenticated){
        if(response.payload.data.role !=="admin"){
          navigate("/paperinsight");
          return;
        }else{
          navigate("/admin");
          return;
        }
      }
    })

    
  },[dispatch])
  
  return (
    <div className='min-h-screen bg-background p-2'>
      <ToastContainer theme='dark' autoClose={1000} />

      <Routes>
        {/* Public */}
        <Route path="/" element={<HomeLayout />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>

        {/* PROTECTED USER DASHBOARD — NO TRAILING SLASH! */}
        <Route
          path="/paperinsight"    
          element={
            <ProtectedRoutes isAuthenticated={isAuthenticated} user={user}>
              <UserLayout />
            </ProtectedRoutes>
          }
        >
          <Route index element={<UserDashboard />} />
          <Route path="papers" element={<Searchpapers />} />
          <Route path="savedpapers" element={<SavedPapers />} />
          <Route path="researchchat" element={<ResearchChatPage />} />
        </Route>

        {/* Admin route */}
        <Route
          path="/admin"
          element={
            <ProtectedRoutes isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout/>
            </ProtectedRoutes>
          }
        />
      </Routes>
    </div>
  );
};

export default App;