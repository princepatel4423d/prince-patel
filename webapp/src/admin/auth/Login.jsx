import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '@/context/AppContext';
import axios from 'axios';
import { useToast } from '@/context/ToastContext';

const Login = () => {
  const navigate = useNavigate();
  const { backendUrl, setIsLoggedin, getAdminData } = useContext(AppContext);
  const { toast } = useToast();

  // Force login only
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      axios.defaults.withCredentials = true;

      // LOGIN ONLY
      const { data } = await axios.post(
        backendUrl + '/api/auth/login',
        { email, password }
      );

      if (data.success) {
        setIsLoggedin(true);
        getAdminData();
        navigate('/admin');
      } else {
        toast(data.message, 'error');
      }

    } catch (error) {
      toast(error.message, 'error');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-5">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg">

        <h2 className="text-2xl font-semibold text-center mb-4">
          Admin Login
        </h2>

        <form onSubmit={onSubmitHandler} className="space-y-4">

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Email"
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Password"
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          <p
            onClick={() => navigate('/admin/reset-password')}
            className="text-sm text-blue-600 cursor-pointer"
          >
            Forgot password?
          </p>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition cursor-pointer"
          >
            Login
          </button>
        </form>

      </div>
    </div>
  );
};

export default Login;