import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import "./Books.css";
// import img from "images/hehe.png"

function BookList() {
  // State to hold the array of books and search input
  const [booksArray, setBooksArray] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  // Fetch books from the API when the component mounts
  useEffect(() => {
    async function getBooks() {
      try {
        const response = await axios.get(
          "https://reactnd-books-api.udacity.com/books",
          {
            headers: { Authorization: "whatever-you-want" },
          }
        );
        setBooksArray(response.data.books);
        console.log("data.books: ", response.data.books);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    }
    getBooks();
  }, []);

  // Filter books based on search input
  const filteredBooks = booksArray.filter((book) => {
    if (!searchInput) {
      return true;
    }
    const title = book.title.toLowerCase();
    return title.startsWith(searchInput.toLowerCase());
  });

  // Handle search input change
  const handleSearch = (e) => {
    setSearchInput(e.target.value);
  };

  return (
    <div className="book-list-container">
      <div className="header">
        <h2>Kalvium Books</h2>
        {/* Search bar */}
        <div className="search-bar-container">
          <input
            className="search-input"
            type="text"
            placeholder="Search..."
            onChange={handleSearch}
          />
        </div>
        {/* Registration button */}
        <NavLink to="/register">
          <button className="register-button">Register Now</button>
        </NavLink>
      </div>
  
      {/* Display filtered books or a message if no results */}
      <div className="book-list">
        {filteredBooks.length ? (
          filteredBooks.map((book) => (
            <div key={book.id} className="book-card">
              <div className="book-image">
                <img
                  className="book-thumbnail"
                  src={book.imageLinks.thumbnail}
                  alt={book.title}
                />
              </div>
              <div className="book-details">
                <p className="book-title">{book.title}</p>
                <p className="book-authors">{book.authors.join(", ")}</p>
                <p className="book-rating">
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
