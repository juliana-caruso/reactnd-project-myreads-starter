import React from "react";

class BookshelfChanger extends React.Component {
  render() {

    const { bookShelf, book, onBookShelfChange, bookId } = this.props;
    
    return (
      <div className="book-shelf-changer">
        <select value={bookShelf} onChange={(e) => onBookShelfChange(e, book)}>
          <option value="move" disabled>
            Move to...
          </option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    );
  }
}

export default BookshelfChanger;
