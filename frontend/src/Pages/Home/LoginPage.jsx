import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from "react-redux"
import { userLogin } from '../../redux/slice/authSlice';
const LoginPage = () => {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: ""

  })

  const [forgotPassword, setForgotPassword] = useState({
    password: "",
    confirmPassword: ""
  })


  const handleForgotPassword = (e) => {
    e.preventDefault();

    if (forgotPassword.password !== forgotPassword.confirmPassword) {
      toast("Passwords do not match!");
      return;
    }



  }




  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(userLogin(loginData))
      .then((response) => {
        console.log("Loginresponse:", response);
        if(response.payload?.success){
          setLoginData({});
          toast.success("Login successful! Redirecting to dashboard...");
          console.log(response.payload.data.user.role)
          if(response.payload.data.user.role ==="admin"){
            navigate("/admin");
            return;
          }else{
            navigate("/paperinsight");
            return
          }
        }else{
          
          toast.error(response.payload || "Login failed. Please try again.");
        }
      })
  }


  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-background/95 backdrop-blur-sm rounded-2xl shadow-lg p-8 sm:p-10">
        <header className="mb-6 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-text">Welcome back</h1>
          <p className="text-sm text-black mt-2">Sign in to continue to Paper Insight</p>
        </header>

        <form action="#" className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="block text-sm font-medium text-text/80 mb-2">Email</label>
            <input
              type="email"
              name="email"
              placeholder="you@domain.com"
              className="w-full rounded-lg border border-text/10 bg-transparent px-4 py-3 text-text placeholder:text-text/50 focus:outline-none focus:ring-2 focus:ring-text/10"
              value={loginData.email}
              onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text/80 mb-2">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="w-full rounded-lg border border-text/10 bg-transparent px-4 py-3 text-text placeholder:text-text/50 focus:outline-none focus:ring-2 focus:ring-text/10"

              value={loginData.password}
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="inline-flex items-center text-sm text-text/80">
              <input type="checkbox" className="mr-2 rounded border-text/10" />
              Remember me
            </label>

            {/* Forgot password trigger */}
            <button
              type="button"
              className="text-sm text-text/80 hover:text-text underline"
              onClick={() => document.getElementById('forgot_password_modal')?.showModal()}
            >
              Forgot password?
            </button>

            {/* Forgot password Modal (DaisyUI/dialog) */}
            <dialog id="forgot_password_modal" className="modal">
              <div method="dialog" className="modal-box bg-background/95 backdrop-blur-sm p-6 relative">
                <button
                  type="button"
                  className="absolute right-3 top-3 text-text/60 hover:text-text"
                  onClick={() => document.getElementById('forgot_password_modal')?.close()}
                  aria-label="Close"
                >
                  ✕
                </button>

                <h3 className="font-bold text-lg text-text text-center mb-4">Update Password</h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-text/80 mb-2">New password</label>
                    <input
                      type="password"
                      name="password"
                      placeholder="Enter new password"
                      className="w-full rounded-lg border border-text/10 bg-transparent px-4 py-3 text-text placeholder:text-text/50 focus:outline-none focus:ring-2 focus:ring-text/10"
                      value={forgotPassword.password}
                      onChange={(e) => setForgotPassword({ ...forgotPassword, password: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text/80 mb-2">Confirm password</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm new password"
                      className="w-full rounded-lg border border-text/10 bg-transparent px-4 py-3 text-text placeholder:text-text/50 focus:outline-none focus:ring-2 focus:ring-text/10"
                      value={forgotPassword.confirmPassword}
                      onChange={(e) => setForgotPassword({ ...forgotPassword, confirmPassword: e.target.value })}
                    />
                  </div>

                  <div className="flex justify-center">
                    <button
                      type="button"
                      className="w-full sm:w-44 bg-text text-background font-semibold px-6 py-2 rounded-lg shadow hover:bg-text/90 transition"
                      onClick={(e) => {
                        handleForgotPassword(e);
                        // close modal on success (simple approach)
                        if (forgotPassword.password && forgotPassword.password === forgotPassword.confirmPassword) {
                          document.getElementById('forgot_password_modal')?.close();
                        }
                      }}
                    >
                      Update password
                    </button>
                  </div>
                </div>
              </div>
              <div method="dialog" className="modal-backdrop">
                <button>close</button>
              </div>
            </dialog>

          </div>

          <div className="flex justify-center">
            <button type="submit" className="w-full sm:w-44 bg-text text-background font-semibold px-6 py-2 rounded-lg shadow hover:bg-text/90 transition">Sign in</button>
          </div>

          <div className="text-center pt-2">
            <p className="text-sm text-black">Don’t have an account? <Link to="/register" className="text-text font-medium underline">Create account</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
