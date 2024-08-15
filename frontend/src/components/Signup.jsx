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
  const [isLogin, setIsLogin] = useState(true); // State to toggle between login and signup

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

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

      // Store token and user ID in state
      localStorage.setItem("authToken", response.data.token); 
      setIsLoggedIn(true);
      setUserId(response.data.userId); 
      navigate("/home");
    } catch (error) {
      toast.error(isLogin ? "Login failed!" : "Signup failed!");
      console.log(error);
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin); 
    setData({ name: "", email: "", password: "" }); 
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>{isLogin ? "Login" : "Sign up"}</h2>
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
