import React from "react";
import * as BooksAPI from "./BooksAPI";
import { Link } from "react-router-dom";

class SearchBook extends React.Component {
  state = {
    searchTerm: "",
    filteredResults: [],
  };

  updateSearch = (searchTerm) => {
    this.setState(() => ({
      searchTerm: searchTerm,
    }));

    if (searchTerm) {
      BooksAPI.search(searchTerm).then((result) => {
        this.setState(() => ({
          filteredResults: result.error ? [] : result,
        }));
      });
    } else {
      this.setState(() => ({
        filteredResults: [],
      }));
    }
  };

  onSearchBookChange = (e, book) => {
    this.props.onBookShelfChange(e, book);
    this.props.onSearchBookAdded(book);
  };

  render() {
    const { searchTerm } = this.state;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/">
            <button
              className="close-search"
              onClick={() => this.setState({ showSearchPage: false })}
            >
              Close
            </button>
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={searchTerm}
              onChange={(event) => this.updateSearch(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.filteredResults && (
              <div className="bookshelf">
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {this.state.filteredResults.map((book) => (
                      <li key={book.id}>
                        <div className="book">
                          <div className="book-top">
                            <div
                              className="book-cover"
                              style={{
                                width: 128,
                                height: 193,
                                backgroundImage: `url(${
                                  book.imageLinks ? book.imageLinks.thumbnail : null
                                })`
                              }}
                            />
                            <div className="book-shelf-changer">
                              <select
                                defaultValue="none"
                                onChange={(e) =>
                                  this.onSearchBookChange(e, book)
                                }
                              >
                                <option value="move" disabled>
                                  Move to...
                                </option>
                                <option value="currentlyReading">
                                  Currently Reading
                                </option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                              </select>
                            </div>
                          </div>
                          <div className="book-title">{book.title}</div>
                          <div className="book-authors">{book.authors}</div>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            )}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchBook;