import React from "react";

class Authors extends React.Component {
  render() {
    const { book } = this.props;
    console.log(book)

    return (
      <div className="book-authors">
        <ul>
          {book.authors && book.authors.map((author) => (
            <li key={author}>{author}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Authors;