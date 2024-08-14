import React, { useState, useEffect } from 'react';
import axios from "axios";
import BooksSection from '../components/BooksSection'
import toast from 'react-hot-toast';


const Books = () => {
  const [Data, setData] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get("http://localhost:1000/api/v1/getBooks");
        setData(res.data); // Set the fetched data to the state
        console.log(res.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
    // toast.success('hello');
  }, []); // Adding the empty dependency array to run the effect only once

  const deleteBook = async (id) => {
    try {
        await axios.delete(`http://localhost:1000/api/v1/deleteBook/${id}`);
        setData({books: Data.books.filter(book => book._id !== id)});
        toast.success("Book deleted successfully!");
    } catch (error) {
        console.error('Error deleting book:', error);
        toast.error("Failed to delete the book.");
    }
};
  return (
    <div className='bg-dark' style={{ minHeight: "91.5vh" }}>
      <div className='d-flex justify-content-center align-items-center py-3'>
        <h4 className='text-white'>Books Section</h4>
      </div>
      {Data ? <BooksSection data={Data} onDelete={deleteBook}/> : <div className='text-white'>Loading...</div>}
        
    </div>
  );
};

export default Books;
