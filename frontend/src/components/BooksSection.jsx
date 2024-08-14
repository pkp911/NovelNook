import React, { useEffect } from "react";
import Parent from "./Parent";
// import cheerio from "cheerio";
const cheerio = require("cheerio");

const BooksSection = ({ data, onDelete }) => {
  const booksArray = data.books;

  const t = "https://openlibrary.org";
  const url =
    "https://openlibrary.org/search.json?q=Sherlock+Holmes&fields=key,title,author_name,editions";

  useEffect(() => {
    const getData = async () => {
      try {
        let data = await fetch(url);
        // console.log(data)
        data = await data.json();
        // console.log(data)
        data = t.concat(data.docs[0].key);
        console.log(data);
        let x = await fetch(data, {
            method:'get',
            headers:{
                
            }
        });
        x = await x.text();
        console.log(data);
        // console.log(x);

        const $ = cheerio.load(x);
        const imageUrl = $('img[itemprop="image"]')["0"].attribs.src;
        console.log(imageUrl)
        return imageUrl;
      } catch (error) {
        console.error("Error fetching data:", error);
        return null;
      }
    };
    getData();
  }, []);

  return (
    <div className="d-flex justify-content-around align-items-center flex-wrap my-3">
      {booksArray.length > 0 ? (
        booksArray.map((item, index) => (
          <div
            key={index}
            className="d-flex flex-column align-items-center"
            style={{
              width: "200px",
              height: "350px",
              backgroundColor: "orange",
              margin: "10px",
              padding: "10px",
              borderRadius: "8px",
            }}
          >
            <div>
              <img
                style={{
                  width: "200px",
                  borderTopLeftRadius: "20px",
                  borderTopRightRadius: "20px",
                }}
                className="img-fluid"
                src={item.image}
                alt={item.bookname}
              />
            </div>
            <h6 style={{ fontSize: "15px" }} className="px-2 my-1 text-white">
              {item.bookname.length > 20
                ? item.bookname.slice(0, 20) + "..."
                : item.bookname}
            </h6>
            <b style={{ fontSize: "10px", color: "red" }} className="mb-2 px-2">
              Rs.{item.price}
            </b>
            <div className="d-flex justify-content-around align-items-center my-2">
              <button className="btn btn-primary">UPDATE</button>
              <button
                className="btn btn-danger"
                onClick={() => onDelete(item._id)}
              >
                DELETE
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No books available</p>
      )}
    </div>
  );
};

export default BooksSection;
