import React from 'react';

function AddBooks() {
  return (
    <div className='bg-dark d-flex justify-content-center align-items-center' style={{ minHeight: "91.5vh", padding: "20px" }}>
        <div className='container p-4'>
      <div className="mb-3 ">
        <label for="exampleFormControlInput1" className="form-label text-white">Book Name</label>
        <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Enter Book Name" name="bookname" />
      </div>
      <div className="mb-3 ">
        <label for="exampleFormControlInput1" className="form-label text-white">Author</label>
        <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Enter The Name Of The Author " />
      </div>
      <div className="mb-3 ">
        <label for="exampleFormControlInput1" className="form-label text-white">Description</label>
        <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Enter Description of the book" />
      </div>
      <div className="mb-3 ">
        <label for="exampleFormControlInput1" className="form-label text-white">Image</label>
        <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Enter the URL of the iamge" />
      </div>
      <div className="mb-3 ">
        <label for="exampleFormControlInput1" className="form-label text-white">Price</label>
        <input type="number" className="form-control" id="exampleFormControlInput1" placeholder="Enter The Price" />
      </div>
      <button className='btn-btn-success'>Submit</button>
      </div>
    </div>
  );
}

export default AddBooks;
