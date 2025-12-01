import React from 'react';
import { useDispatch } from 'react-redux';
import { userLogout } from '../../redux/slice/authSlice';
import { toast } from 'react-toastify';
const AdminLayout = () => {

  const dispatch = useDispatch();
  const handleLogout = () => {
    
    dispatch(userLogout())
      .then((response) => {
        console.log(response)
        if (response.payload.success) {
          toast.success("Logged out successfully!");
        }
      })
  }
  return (
    <div>
      <h1 className="text-black text-4xl">Admin</h1>
      <button className='bg-black text-white mt-4 p-3' onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default AdminLayout;
