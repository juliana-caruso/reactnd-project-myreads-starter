import React from "react";
import BookshelfChanger from "./BookshelfChanger";

class Bookshelf extends React.Component {
  render() {
    const { books, onBookShelfChange, title } = this.props;

    const currentlyReading = books.filter((book) => book.shelf.includes("currentlyReading"));
    const wantToRead = books.filter((book) => book.shelf.includes("wantToRead"));
    const read = books.filter((book) => book.shelf.includes("read"));

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {title === "Currently Reading"
              ? currentlyReading.map((book) => (
                  <li key={book.id}>
                    <div className="book">
                      <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${ book.imageLinks.thumbnail })` }} />
                        <BookshelfChanger
                          onBookShelfChange={onBookShelfChange}
                          bookId={book.id}
                          bookShelf={book.shelf}
                          book={book}
                        />
                      </div>
                      <div className="book-title">{book.title}</div>
                      <div className="book-authors">{book.authors}</div>
                    </div>
                  </li>
                ))
              : title === "Want to Read"
              ? wantToRead.map((book) => (
                  <li key={book.id}>
                    <div className="book">
                      <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${ book.imageLinks.thumbnail })` }} />
                        <BookshelfChanger
                          onBookShelfChange={onBookShelfChange}
                          bookId={book.id}
                          bookShelf={book.shelf}
                          book={book}
                        />
                      </div>
                      <div className="book-title">{book.title}</div>
                      <div className="book-authors">{book.authors}</div>
                    </div>
                  </li>
                ))
              : read.map((book) => (
                  <li key={book.id}>
                    <div className="book">
                      <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${ book.imageLinks.thumbnail })` }} />
                        <BookshelfChanger
                          onBookShelfChange={onBookShelfChange}
                          bookId={book.id}
                          bookShelf={book.shelf}
                          book={book}
                        />
                      </div>
                      <div className="book-title">{book.title}</div>
                      <div className="book-authors">{book.authors}</div>
                    </div>
                  </li>
                ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default Bookshelf;
