import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Search.css";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";

function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loadingImages, setLoadingImages] = useState({});
  const [isLoading, setLoading] = useState(false);

  const navigate = useNavigate();

  const truncateString = (str, num) => {
    return str && str.length > num ? str.slice(0, num) + "..." : str;
  };

  const handleSearch = async () => {
    if (!query) return;

    setLoading(true); // Start loading
    setResults([]); // Clear previous results

    const url = `https://openlibrary.org/search.json?q=${query}&fields=key,title,author_name,cover_i`;

    try {
      let data = await fetch(url);
      data = await data.json();

      const filteredResults = data.docs.filter((item) => item.cover_i);

      const initialLoadingState = {};
      filteredResults.forEach((item) => {
        initialLoadingState[item.cover_i] = true;
      });
      setLoadingImages(initialLoadingState);

      setResults(filteredResults);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleImageLoad = (coverId) => {
    setLoadingImages((prevState) => ({
      ...prevState,
      [coverId]: false,
    }));
  };

  const handleReadMore = (bookId) => {
    navigate(`/readmore/${bookId}`);
  };

  return (
    <div className="search-container">
      <h3>Search Books</h3>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for a book..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
        />
        <Button
          variant="primary"
          disabled={isLoading}
          onClick={!isLoading ? handleSearch : null}
          className="search-button"
        >
          {isLoading ? (
            <>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            </>
          ) : (
            "🔍"
          )}
        </Button>
      </div>

      <div className="search-results" style={{ marginTop: "20px" }}>
        {results.length > 0 ? (
          <div className="grid-container">
            {results.map((item, index) => {
              const title = truncateString(item.title || "Untitled", 30);
              const author = truncateString(
                item.author_name
                  ? item.author_name.join(", ")
                  : "Unknown Author",
                30
              );

              return (
                <div key={index} className="grid-item">
                  {loadingImages[item.cover_i] && (
                    <div className="spinner-container">
                      <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </Spinner>
                    </div>
                  )}
                  <img
                    src={`https://covers.openlibrary.org/b/id/${item.cover_i}-L.jpg`}
                    alt={title}
                    className={`book-cover ${
                      !loadingImages[item.cover_i] && "loaded"
                    }`}
                    onLoad={() => handleImageLoad(item.cover_i)}
                  />
                  <div>
                    <span className="book-title">{title}</span>
                    <br />
                    <span className="book-author">{author}</span>
                  </div>
                  <Button
                    variant="secondary"
                    onClick={() => handleReadMore(item.key.split("/").pop())}
                    className="read-more-button"
                    style={{ marginTop: "10px" }}
                  >
                    Read More
                  </Button>
                  <Button
                    variant="success"
                    onClick={() =>
                      navigate(`/buynow/${item.key.split("/").pop()}`)
                    }
                    className="buy-now-button"
                    style={{ marginTop: "10px" }}
                  >
                    Buy Now
                  </Button>
                </div>
              );
            })}
          </div>
        ) : (
          !isLoading && <p>No results found</p>
        )}
      </div>
    </div>
  );
}

export default Search;
