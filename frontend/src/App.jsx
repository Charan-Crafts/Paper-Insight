import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomeLayout from './Pages/Home/HomeLayout';
import LoginPage from './Pages/Home/LoginPage';
import RegisterPage from './Pages/Home/RegisterPage';
import HomePage from './Pages/Home/HomePage';
import { ToastContainer } from "react-toastify"
import UserLayout from './Pages/User/UserLayout';

import UserDashboard from './Pages/User/UserDashboard';
import Searchpapers from './Pages/User/Searchpapers';
import SavedPapers from './Pages/User/SavedPapers';
import ResearchChatPage from './Pages/User/ResearchChatPage';
const App = () => {
  return (
    <div className='min-h-screen bg-background p-2'>
      <ToastContainer theme='dark' autoClose={1000}/>
      <Routes>



        <Route path="/" element={<HomeLayout />} >

          <Route path="" element={<HomePage />} />

          <Route path="register" element={<RegisterPage />} />
          <Route path="login" element={<LoginPage />} />

        </Route>

        <Route path="/paperinsight/" element={<UserLayout/>}>
          <Route path="" element={<UserDashboard/>}/>
          <Route path="papers" element={<Searchpapers/>}></Route>
          <Route path="savedpapers" element={<SavedPapers/>}></Route>
          <Route path="researchchat" element={<ResearchChatPage/>}></Route>
        </Route>

      </Routes>

    </div>
  );
}

export default App;
