import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import Bookshelf from "./Bookshelf";
import SearchBook from "./SearchBook";
import { Switch, Route, Link } from "react-router-dom";

class BooksApp extends React.Component {
  state = {
    books: [],
  };

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState(() => ({
        books,
      }));
    });
  }

  onBookShelfChange = (e, book) => {
    const shelf = e.target.value;
    BooksAPI.update(book, shelf).then(() => {
      book.shelf = shelf;
      BooksAPI.getAll().then((data) => this.setState({ books: data }));
    });
  };

  onSearchBookAdded = (book) => {
    this.setState((prevState) => ({
      books: prevState.books
        .filter((b) => b.title !== book.title)
        .concat([book]),
    }));
  };

  render() {
    const { books } = this.state;
    const currentlyReading = books.filter((book) =>
      book.shelf.includes("currentlyReading")
    );
    const wantToRead = books.filter((book) =>
      book.shelf.includes("wantToRead")
    );
    const read = books.filter((book) => book.shelf.includes("read"));
    

    return (
      <div className="app">
        <Switch>
          <Route exact path="/" render={() => (
              <>
                <div className="list-books">
                  <div className="list-books-title">
                    <h1>MyReads</h1>
                  </div>
                  <div className="list-books-content">
                    <div>
                      <div className="bookshelf">
                        <h2 className="bookshelf-title">Currently Reading</h2>
                        <Bookshelf
                          books={currentlyReading}
                          onBookShelfChange={this.onBookShelfChange}
                        />
                      </div>
                      <div className="bookshelf">
                        <h2 className="bookshelf-title">Want to Read</h2>
                        <Bookshelf
                          books={wantToRead}
                          onBookShelfChange={this.onBookShelfChange}
                        />
                      </div>
                      <div className="bookshelf">
                        <h2 className="bookshelf-title">Read</h2>
                        <Bookshelf
                          books={read}
                          onBookShelfChange={this.onBookShelfChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <Link to="/search">
                  <div className="open-search">
                    <button>Add a book</button>
                  </div>
                </Link>
              </>
            )}
          />

          <Route path="/search">
            <SearchBook
              onBookShelfChange={this.onBookShelfChange}
              onSearchBookAdded={this.onSearchBookAdded}
              books={books}
            />
          </Route>
        </Switch>
      </div>
    );
  }
}

export default BooksApp;