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
    return (
      <div className="app">
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <>
                <div className="list-books">
                  <div className="list-books-title">
                    <h1>MyReads</h1>
                  </div>
                  <div className="list-books-content">
                    <div>
                      <Bookshelf
                        books={this.state.books}
                        status={this.state.currentlyReading}
                        onBookShelfChange={this.onBookShelfChange}
                        title="Currently Reading"
                      />
                      <Bookshelf
                        books={this.state.books}
                        status={this.state.wantToRead}
                        onBookShelfChange={this.onBookShelfChange}
                        title="Want to Read"
                      />
                      <Bookshelf
                        books={this.state.books}
                        status={this.state.read}
                        onBookShelfChange={this.onBookShelfChange}
                        title="Read"
                      />
                    </div>
                  </div>
                </div>

                <Link to="/search-book">
                  <div className="open-search">
                    <button>Add a book</button>
                  </div>
                </Link>
              </>
            )}
          />

          <Route path="/search-book">
            <SearchBook
              onBookShelfChange={this.onBookShelfChange}
              onSearchBookAdded={this.onSearchBookAdded}
            />
          </Route>
        </Switch>
      </div>
    );
  }
}

export default BooksApp;
