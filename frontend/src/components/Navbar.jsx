import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div style={{borderBottom:"1px solid white"}}>
      <nav className="navbar navbar-expand-lg bg-dark">
        <div className="container">
          <a className="navbar-brand text-white" href="#">BooksStore</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav ms-auto mb-2 mg-lg-0">
              <Link className="nav-item nav-link active text-white" to="/">
                 HOME
               </Link>
              
               <Link className="nav-item nav-link active text-white" to="/books">
                 Books
               </Link>
               <Link className="nav-item nav-link active text-white" to="/addBooks">
                 Add Books
               </Link>
               <Link className="nav-item nav-link active text-white" to="/search">
                 Search
               </Link>
              
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
