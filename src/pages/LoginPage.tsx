import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Car, Eye, EyeOff } from "lucide-react";
import apiCall from "../lib/apiCall";
import { API_ENDPOINTS } from "../lib/constant";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });

  // const validateEmail = (email: string) => {
  //   return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  // };

  // const validatePassword = (password: string) => {
  //   return password.length >= 6; // Minimum 6 characters
  // };

  const LoginApi = async (e: React.FormEvent) => {
    e.preventDefault();
    let valid = true;
    const newErrors = { email: "", password: "" };
  
    if (!email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Invalid email format";
      valid = false;
    }
  
    if (!password.trim()) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      valid = false;
    }
  
    setErrors(newErrors); 
  
    if (!valid) return; 
    
    try {
      const response = await apiCall({
        method: "POST",
        endpoint: API_ENDPOINTS.AdminLogin,
        body: { email, password },
      });
      sessionStorage.setItem('token', response.data.access_token);

      console.log("Login successful:", response);

      if (typeof window !== "undefined") {
      sessionStorage.setItem('token', response.data.access_token);
      sessionStorage.setItem("refresh_token", response.refresh_token);
      }

      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
      alert(error?.message || "Login failed. Please try again.");
    }
  };


  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="text-center mb-8">
          <Car className="h-12 w-12 text-blue-600 mx-auto mb-3" />
          <h2 className="text-2xl font-bold text-gray-900">Admin Login</h2>
        </div>

        <form onSubmit={LoginApi} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border-1 p-[10px]"
              required
            />
          </div>
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}


          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full border-1 p-[10px] rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
          </div>
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
