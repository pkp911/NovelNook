import React from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const Navbar = ({ isLoggedIn, setIsLoggedIn, userId }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the token from local storage or cookies
    localStorage.removeItem("authToken"); // Adjust this line if you're using cookies or a different storage
    setIsLoggedIn(false); // Update the login state
    navigate("/"); // Redirect to the Signup page
    toast.success("Logged out successfully!");
  };

  const handleDelete = async () => {
    try {
      if (!userId) {
        throw new Error("User ID is missing");
      }
      console.log(userId);

      await axios.delete(`http://localhost:1000/api/v1/delete/${userId}`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      localStorage.removeItem("authToken");
      setIsLoggedIn(false);
      navigate("/"); 
      toast.success("Account deleted successfully!");
    } catch (error) {
      console.error("Error deleting account:", error);
      toast.error("Failed to delete account.");
    }
  };

  return (
    <div style={{ borderBottom: "1px solid white" }}>
      <nav className="navbar navbar-expand-lg bg-dark">
        <div className="container">
          <a className="navbar-brand text-white" href="#">
            BooksStore
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {isLoggedIn ? (
                <>
                  <Link className="nav-item nav-link active text-white" to="/home">HOME</Link>
                  <Link className="nav-item nav-link active text-white" to="/books">Books</Link>
                  <Link className="nav-item nav-link active text-white" to="/addBooks">Add Books</Link>
                  <Link className="nav-item nav-link active text-white" to="/search">Search</Link>
                  <Link className="nav-item nav-link active text-white" to="/favourite">Favourite</Link>
                  <button
                    className="nav-item nav-link active text-white"
                    onClick={handleDelete}
                    style={{ border: 'none', background: 'none', cursor: 'pointer' }}
                  >
                    Delete Account
                  </button>
                  <button
                    className="nav-item nav-link active text-white"
                    onClick={handleLogout}
                    style={{ border: 'none', background: 'none', cursor: 'pointer' }}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link className="nav-item nav-link active text-white" to="/">Login</Link>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
