import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

function Signup({ setIsLoggedIn, setUserId }) {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isLogin, setIsLogin] = useState(true);

  // Handle input change
  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission for login and signup
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (isLogin) {
        // Login request
        response = await axios.post(
          "http://localhost:1000/api/v1/login",
          {
            email: data.email,
            password: data.password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        toast.success("Login successful!");
      } else {
        // Signup request
        response = await axios.post(
          "http://localhost:1000/api/v1/register",
          data,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        toast.success("Signup successful!");
      }

      // Extract user ID from the response and set state
      const userId = response.data.user._id;
      localStorage.setItem("authToken", response.data.token); // Save token to localStorage
      localStorage.setItem("userId", userId); // Save userId to localStorage

      setIsLoggedIn(true);
      setUserId(userId);
      navigate("/home");
    } catch (error) {
      toast.error(isLogin ? "Login failed!" : "Signup failed!");
      console.log(error);
    }
  };

  // Toggle between login and signup forms
  const toggleForm = () => {
    setIsLogin(!isLogin);
    setData({ name: "", email: "", password: "" });
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>{isLogin ? "Login" : "Sign Up"}</h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={data.name}
              onChange={handleChange}
              required={!isLogin}
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={data.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={data.password}
            onChange={handleChange}
            required
          />
          <button type="submit" className="signup-button">
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>
        <p onClick={toggleForm} className="toggle-form">
          {isLogin ? "Don't have an account? Sign up" : "Already have an account? Login"}
        </p>
      </div>
    </div>
  );
}

export default Signup;
