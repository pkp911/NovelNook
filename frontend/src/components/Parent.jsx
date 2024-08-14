import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BooksSection from './BooksSection';

const Parent = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        // Fetch books from the database when the component mounts
        const fetchBooks = async () => {
            try {
                const response = await axios.get('http://localhost:1000/api/v1/getBooks');
                setBooks(response.data.books);
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };

        fetchBooks();
    }, []);

    const deleteBook = async (id) => {
        try {
            await axios.delete(`http://localhost:1000/api/v1/deleteBook/${id}`);
            setBooks(books.filter(book => book._id !== id));
            alert("Book deleted successfully!");
        } catch (error) {
            console.error('Error deleting book:', error);
            alert("Failed to delete the book.");
        }
    };

    return <BooksSection data={{ books }} onDelete={deleteBook} />;

};

export default Parent;
