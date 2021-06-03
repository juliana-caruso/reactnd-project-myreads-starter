import React from "react";
import * as BooksAPI from "./BooksAPI";
import { Link } from "react-router-dom";
import Bookshelf from './Bookshelf';

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
          filteredResults: result.error ? [] : result.map((searchBook) => this.applyShelf(searchBook))
        }));
      });
    } else {
      this.setState(() => ({
        filteredResults: [],
      }));
    }
  };

  applyShelf = (searchBook) => {
    const { books } = this.props;
    const existingBook = books.find((b) => b.id === searchBook.id);
    if (existingBook) {
        searchBook.shelf = existingBook.shelf;
    } else {
        searchBook.shelf = "none";
    }
    return searchBook;
  }

  onSearchBookChange = (e, book) => {
    this.props.onBookShelfChange(e, book);
    this.props.onSearchBookAdded(book);
  };

  

  render() {
    const { searchTerm, filteredResults } = this.state;


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
            {filteredResults && (
              <div className="bookshelf">
                <Bookshelf 
                    books={filteredResults}
                    onBookShelfChange={this.onSearchBookChange}
                />
              </div>
            )}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchBook;