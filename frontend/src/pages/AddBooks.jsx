import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function AddBooks() {
  const navigate= useNavigate();
  const [data, setData] = useState({
    bookname: "",
    author: "",
    description: "",
    price: "",
    image: ""
  });

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  

  const submit = async (e) => {
    e.preventDefault();
    // Basic validation
    if (!data.bookname || !data.author || !data.description || !data.price || !data.image) {
      toast.error("Please fill in all the fields.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:1000/api/v1/add", data);

      console.log(response);

      // Reset form data
      setData({
        bookname: "",
        author: "",
        description: "",
        price: "",
        image: ""
      });

      toast.success("Book added successfully!");
      navigate('/books');

    } catch (error) {
      console.error("There was an error submitting the data!", error);
      toast.error("Failed to add the book. Please try again.");
    }
  };

  return (
    <div className='bg-dark d-flex justify-content-center align-items-center' style={{ minHeight: "91.5vh", padding: "20px" }}>
      <form className='container p-4' onSubmit={submit}>
        <div className="mb-3">
          <label htmlFor="bookname" className="form-label text-white">Book Name</label>
          <input
            type="text"
            className="form-control"
            id="bookname"
            placeholder="Enter Book Name"
            name="bookname"
            value={data.bookname}
            onChange={change}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="author" className="form-label text-white">Author</label>
          <input
            type="text"
            className="form-control"
            id="author"
            placeholder="Enter The Name Of The Author"
            name="author"
            value={data.author}
            onChange={change}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label text-white">Description</label>
          <input
            type="text"
            className="form-control"
            id="description"
            placeholder="Enter Description of the book"
            name="description"
            value={data.description}
            onChange={change}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label text-white">Image</label>
          <input
            type="text"
            className="form-control"
            id="image"
            placeholder="Enter the URL of the image"
            name="image"
            value={data.image}
            onChange={change}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label text-white">Price</label>
          <input
            type="number"
            className="form-control"
            id="price"
            placeholder="Enter The Price"
            name="price"
            value={data.price}
            onChange={change}
          />
        </div>
        <button className='btn btn-success' type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddBooks;
