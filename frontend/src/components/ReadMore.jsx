import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import "./ReadMore.css"; // Assuming you have a CSS file for styling

function ReadMore() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loadingImages, setLoadingImages] = useState({});

  const getAuthorNames = (authors) => {
    if (!authors || authors.length === 0) {
      return "Unknown";
    }
    return authors.join(", ");
  };

  const handleImageLoad = (coverId) => {
    setLoadingImages((prev) => ({
      ...prev,
      [coverId]: true,
    }));
  };

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await fetch(
          `https://openlibrary.org/works/${id}.json`
        );
        if (!response.ok) {
          throw new Error(
            `Failed to fetch book details: ${response.statusText}`
          );
        }
        const data = await response.json();
        console.log("Fetched Book Data:", data);

        // Extracting the author names if available
        const authorNames = getAuthorNames(
          data.authors?.map((author) => author.name)
        );

        // Setting the book data with author names included
        setBook({ ...data, authorNames });
      } catch (error) {
        console.error("Error fetching book details:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [id]);

  if (isLoading) {
    return (
      <div className="spinner-container">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  if (!book) {
    return <p>No book details found</p>;
  }

  return (
    <div className="readmore-container">
      <h2>{book.title}</h2>
      <p><strong>Author:</strong> {book.authorNames||book.author_name || "Unknown"}</p>
      <p>
        <strong>First Published:</strong>{" "}
        {book.first_publish_year || book.first_publish_date || "Unknown"}
      </p>
      {book.covers && book.covers.length > 0 && (
        <img
          src={`https://covers.openlibrary.org/b/id/${book.covers[0]}-L.jpg`}
          alt={book.title}
          className={`book-cover ${loadingImages[book.covers[0]] && "loaded"}`}
          onLoad={() => handleImageLoad(book.covers[0])}
        />
      )}
      <p>
        {book.description?.value ||
          book.description ||
          "No description available."}
      </p>
    </div>
  );
}

export default ReadMore;
