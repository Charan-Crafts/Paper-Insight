import React from 'react';
import Navbar from '../../Components/HomeComponents/Navbar';

import { Outdent } from 'lucide-react';
import { Outlet } from 'react-router-dom';
const HomeLayout = () => {
  return (
    <div className=' min-h-screen'>
      <Navbar/>

      <Outlet/>

      

    </div>
  );
}

export default HomeLayout;
