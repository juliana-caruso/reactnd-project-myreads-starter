import React from "react";
import BookshelfChanger from "./BookshelfChanger";
import Authors from "./Authors";

class Bookshelf extends React.Component {
  
  render() {
    const { books, onBookShelfChange } = this.props;

    return (
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map((book) => (
            <li key={book.id}>
              <div className="book">
                <div className="book-top">
                  <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks ? book.imageLinks.thumbnail : null })` }} />
                  <BookshelfChanger
                    onBookShelfChange={onBookShelfChange}
                    book={book}
                  />
                </div>
                <div className="book-title">{book.title}</div>
                <Authors book={book} />
              </div>
            </li>
          ))}
        </ol>
      </div>
    );
  }
}

export default Bookshelf;
