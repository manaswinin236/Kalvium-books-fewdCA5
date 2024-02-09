import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import "./Books.css";

function BookList() {
  const [booksArray, setBooksArray] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    async function fetchBooks() {
      try {
        const response = await axios.get(
          "https://reactnd-books-api.udacity.com/books",
          { headers: { Authorization: "whatever-you-want" } }
        );
        setBooksArray(response.data.books);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    }
    fetchBooks();
  }, []);

  const filteredBooks = booksArray.filter((book) =>
    !searchInput || book.title.toLowerCase().startsWith(searchInput.toLowerCase())
  );

  const handleSearch = (e) => {
    setSearchInput(e.target.value);
  };

  return (
    <div className="main-container">
      <div className="header">
        <h2>Kalvium Books</h2>
        <div className="searchbar">
          <input
            className="search-input"
            type="text"
            placeholder="Search..."
            onChange={handleSearch}
          />
        </div>
        <NavLink to="/register">
          <button className="register-button">Register Now</button>
        </NavLink>
      </div>
  
      <div className="book-list">
        {filteredBooks.length ? (
          filteredBooks.map((book) => (
            <div key={book.id} className="book-card-container">
              <div className="book-images">
                <img
                  className="book-thumbnail"
                  src={book.imageLinks.thumbnail}
                  alt={book.title}
                />
              </div>
              <div className="book-details">
                <p className="title">{book.title}</p>
                <p className="author">{book.authors.join(", ")}</p>
                <p className="rating">
                  Rating: ⭐ {book.averageRating || "..."} /5
                </p>
              </div>
            </div>
          ))
        ) : (
          <p>No Result Found</p>
        )}
      </div>
    </div>
  );
}

export default BookList;
