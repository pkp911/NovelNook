import React from "react";
import Parent from "./Parent";
const cheerio = require("cheerio");

const BooksSection = ({ data, onDelete }) => {
  const booksArray = data.books;

  return (
    <div className="container my-4">
      <div className="row">
        {booksArray.length > 0 ? (
          booksArray.map((item, index) => (
            <div key={index} className="col-md-4 col-lg-3 mb-4">
              <div className="card shadow-sm" style={{ height: "100%" }}>
                <img
                  src={item.image}
                  alt={item.bookname}
                  className="card-img-top img-fluid"
                  style={{
                    height: "200px",
                    objectFit: "cover",
                    borderTopLeftRadius: "100px",
                    borderTopRightRadius: "100px",
                  }}
                />
                <div className="card-body text-center">
                  <h6 className="card-title">
                    {item.bookname.length > 20
                      ? item.bookname.slice(0, 20) + "..."
                      : item.bookname}
                  </h6>
                  <p className="card-text text-danger fw-bold">
                    Rs.{item.price}
                  </p>
                  <div className="d-flex justify-content-around mt-3">
                    <button className="btn btn-primary">UPDATE</button>
                    <button
                      className="btn btn-danger"
                      onClick={() => onDelete(item._id)}
                    >
                      DELETE
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No books available</p>
        )}
      </div>
    </div>
  );
};

export default BooksSection;
