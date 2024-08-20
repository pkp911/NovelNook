import React, { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Books from "./pages/Books";
import AddBooks from "./pages/AddBooks";
import Search from "./pages/Search";
import Footer from "./components/Footer";
import Signup from "./components/Signup";
import ReadMore from "./components/ReadMore";
import Buynow from "./pages/Buynow";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);

  // Check for token and userId on initial load
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const storedUserId = localStorage.getItem("userId");

    if (token && storedUserId) {
      setIsLoggedIn(true);
      setUserId(storedUserId);
    }
  }, []);

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} userId={userId} />
      <Routes>
        <Route
          path="/"
          element={isLoggedIn ? <Navigate to="/home" /> : <Signup setIsLoggedIn={setIsLoggedIn} setUserId={setUserId} />}
        />
        <Route path="/home" element={isLoggedIn ? <Home /> : <Navigate to="/" />} />
        <Route path="/books" element={isLoggedIn ? <Books /> : <Navigate to="/" />} />
        <Route path="/addBooks" element={isLoggedIn ? <AddBooks /> : <Navigate to="/" />} />
        <Route path="/search" element={isLoggedIn ? <Search /> : <Navigate to="/" />} />
        <Route path="/readmore/:id" element={isLoggedIn ? <ReadMore /> : <Navigate to="/" />} />
        <Route path="/buynow/:bookId" element={<Buynow />} />
      </Routes>
      {/* <Footer /> */}
    </Router>
  );
}

export default App;
