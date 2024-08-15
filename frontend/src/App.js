import React, { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Books from "./pages/Books";
import AddBooks from "./pages/AddBooks";
import Search from "./pages/Search";
import Footer from "./components/Footer";
import Signup from "./components/Signup";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} userId={userId} />
      <Routes>
        <Route path="/" element={<Signup setIsLoggedIn={setIsLoggedIn} setUserId={setUserId} />} />
        <Route path="/home" element={<Home />} />
        <Route path="/books" element={<Books />} />
        <Route path="/addBooks" element={<AddBooks />} />
        <Route path="/search" element={<Search />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
