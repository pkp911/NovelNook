import React, { useState, useEffect } from 'react';
import axios from "axios";
import BooksSection from '../components/BooksSection'

const Books = () => {
  const [Data, setData] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get("http://localhost:1000/api/v1/getBooks");
        setData(res.data); // Set the fetched data to the state
        // console.log(res.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []); // Adding the empty dependency array to run the effect only once

  return (
    <div className='bg-dark' style={{ minHeight: "91.5vh" }}>
      <div className='d-flex justify-content-center align-items-center py-3'>
        <h4 className='text-white'>Books Section</h4>
      </div>
      {Data ? <BooksSection data={Data}/> : <div className='text-white'>Loading...</div>}
        
    </div>
  );
};

export default Books;
