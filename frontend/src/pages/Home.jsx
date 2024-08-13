import React from 'react';
import './Home.css';
import bookImage from '../images/pkp.avif'; // Import the image with a proper variable name
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className='Home-Page bg-dark text-white container-fluid d-flex justify-content-center align-items-center'>
            <div className='row container'>
                <div className='col-lg-6 d-flex justify-content-center align-items-start flex-column'
                    style={{ height: "91.5vh" }}>
                    <h2 style={{ fontSize: "80px" }}>BOOK STORE </h2>
                    <h3 style={{ fontSize: "50px" }}>FOR YOU</h3>
                    <p className='mb' style={{color:"silver"}}>Checkout the books from here</p>
                    <Link to="/books" className='viewBook my-3'> 
                      View Books
                    </Link>
                    
                </div>

                <div className='col-lg-6 d-flex justify-content-center align-items-end flex-column'
                    style={{ height: "91.5vh" }}>
                    <img src={bookImage} alt="Books" style={{ maxWidth: '100%', height: 'auto' }} />
                </div>
            </div>
        </div>
    );
};

export default Home;
