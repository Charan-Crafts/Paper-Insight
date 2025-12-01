import React from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from 'react-router-dom';
import { userRegistration } from '../../redux/slice/authSlice';
const RegisterPage = () => {

  const navigate = useNavigate();

  const [confirmPassword, setConfirmPassword] = useState("");

  const [terms, setTerms] = useState(false);

  const [registerData, setRegisterData] = useState({
    userName: "",
    email: "",
    password: "",

    role: "",
    country: ""
  })

  const dispatch = useDispatch();

  const handleRegistration = (e) => {
    //  alert("Registration submitted!");
    e.preventDefault();

    if (registerData.password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    if (!terms) {
      toast.error("You must agree to the terms of service!");
      return;
    }

    dispatch(userRegistration(registerData))
      .then((response)=>{
        console.log("Registration response:", response);
        if(response.payload?.success){
          toast.success("Registration successful! Redirecting to dashboard...");
          navigate("/paperinsight");
        }else{
          toast.error(response.payload || "Registration failed. Please try again.");
        }
      })


  }
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl bg-background/95 backdrop-blur-sm rounded-2xl shadow-lg p-8 sm:p-10">
        <header className="mb-6 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-text">Create an account</h1>
          <p className="text-sm text-black mt-2">Join Paper Insight — get smart summaries, PDF analysis and research recommendations.</p>
        </header>

        <form action="#" className="grid grid-cols-1 sm:grid-cols-2 gap-4" onSubmit={handleRegistration}>
          <div className="col-span-1">
            <label className="block text-sm font-medium text-black mb-2">Full name</label>
            <input
              type="text"
              name="name"
              placeholder="Your full name"
              className="w-full rounded-lg border border-text/10 bg-transparent px-4 py-3 text-text placeholder:text-text/50 focus:outline-none focus:ring-2 focus:ring-text/10"
              value={registerData.userName}
              onChange={(e) => setRegisterData({ ...registerData, userName: e.target.value })}
            />
          </div>

          <div className="col-span-1">
            <label className="block text-sm font-medium text-black mb-2">Email address</label>
            <input
              type="email"
              name="email"
              placeholder="you@domain.com"
              className="w-full rounded-lg border border-text/10 bg-transparent px-4 py-3 text-text placeholder:text-text/50 focus:outline-none focus:ring-2 focus:ring-text/10"
              value={registerData.email}
              onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
            />
          </div>

          <div className="col-span-1">
            <label className="block text-sm font-medium text-black mb-2">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Create a password"
              className="w-full rounded-lg border border-text/10 bg-transparent px-4 py-3 text-text placeholder:text-text/50 focus:outline-none focus:ring-2 focus:ring-text/10"
              value={registerData.password}
              onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
            />
          </div>

          <div className="col-span-1">
            <label className="block text-sm font-medium text-black mb-2">Confirm password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              className="w-full rounded-lg border border-text/10 bg-transparent px-4 py-3 text-text placeholder:text-text/50 focus:outline-none focus:ring-2 focus:ring-text/10"
              value={confirmPassword}

              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <div className="col-span-1">
            <label className="block text-sm font-medium text-black mb-2">Role</label>
            <select className="w-full rounded-lg border border-text/10 bg-transparent px-4 py-3 text-text focus:outline-none focus:ring-2 
            focus:ring-text/10" value={registerData.role} onChange={(e) => setRegisterData({ ...registerData, role: e.target.value })}>
              <option value="" disabled>
                — Select your role —
              </option>
              <option value="researcher">Researcher</option>
              <option value="student">Student</option>
              <option value="instructor">Instructor</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="col-span-1">
            <label className="block text-sm font-medium text-black mb-2">Country (optional)</label>
            <input
              type="text"
              name="country"
              placeholder="Country"
              className="w-full rounded-lg border border-text/10 bg-transparent px-4 py-3 text-text placeholder:text-text/50 focus:outline-none focus:ring-2 focus:ring-text/10"
              value={registerData.country}
              onChange={(e) => setRegisterData({ ...registerData, country: e.target.value })}
            />
          </div>

          <div className="col-span-1 sm:col-span-2 mt-2">
            <label className="inline-flex items-center text-sm text-black">
              <input type="checkbox" className="mr-2 rounded border-text/10"
                checked={terms}
                onChange={(e) => setTerms(e.target.checked)}
              />
              I agree to the <a className="text-text underline" href="#">Terms of Service</a> and <a className="text-text underline" href="#">Privacy Policy</a>
            </label>
          </div>

          <div className="col-span-1 sm:col-span-2 mt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button type="submit" className="w-full sm:w-auto bg-text text-background font-semibold px-6 py-3 rounded-lg shadow hover:bg-text/90 transition">Create account</button>
            {/* <button type="button" className="w-full sm:w-auto border border-text/10 text-text px-6 py-3 rounded-lg hover:bg-text/5 transition">Sign up with Google</button> */}
          </div>

          <div className="col-span-1 sm:col-span-2 text-center mt-2">
            <p className="text-sm text-text/70">Already have an account? <Link to="/login" className="text-text font-medium underline">Sign in</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
