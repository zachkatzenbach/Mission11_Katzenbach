import { useEffect, useState } from 'react';
import { Book } from './types/Book';

function BookList() {
  const [books, setBooks] = useState<Book[]>([]);
  const [pageSize, setPageSize] = useState<number>(5);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalBooks, setTotalBooks] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [isSorted, setIsSorted] = useState<number>(0);
  var sortedBooks;

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch(
        `https://localhost:5000/api/Book?pageSize=${pageSize}&pageNum=${pageNum}&isSorted=${isSorted}`
      );
      const data = await response.json();

      //If dropdown is yes, sort by book title alphabetically
      if (isSorted == 1) {
        sortedBooks = (data.books as Book[]).sort((a, b) =>
          a.title.localeCompare(b.title)
        );
      } else {
        sortedBooks = data.books;
      }

      setBooks(sortedBooks);
      setTotalBooks(data.totalBooks);
      setTotalPages(Math.ceil(totalBooks / pageSize));
    };

    fetchBooks();
  }, [pageSize, pageNum, totalBooks, isSorted]);

  return (
    <>
      <h1>Books</h1>
      <label htmlFor="isSorted">Sort by title?</label>
      <select
        id="isSorted"
        name="isSorted"
        value={isSorted}
        onChange={(p) => {
          setIsSorted(Number(p.target.value));
        }}
      >
        <option value="1">Yes</option>
        <option value="0">No</option>
      </select>
      {books.map((b) => (
        <div className="card" id="bookCard" key={b.bookID}>
          <h3 className="card-title">{b.title}</h3>

          <div className="card-body">
            <ul className="list-unstyled">
              <li>
                <strong>Author: </strong>
                {b.author}
              </li>
              <li>
                <strong>Publisher: </strong>
                {b.publisher}
              </li>
              <li>
                <strong>ISBN: </strong>
                {b.isbn}
              </li>
              <li>
                <strong>Category: </strong>
                {b.category}
              </li>
              <li>
                <strong>Page Count: </strong>
                {b.pageCount}
              </li>
              <li>
                <strong>Price: </strong>
                {b.price}
              </li>
            </ul>
          </div>
        </div>
      ))}

      <button disabled={pageNum === 1} onClick={() => setPageNum(pageNum - 1)}>
        Previous
      </button>

      {[...Array(totalPages)].map((_, i) => (
        <button
          key={i + 1}
          onClick={() => setPageNum(i + 1)}
          disabled={pageNum === i + 1}
        >
          {i + 1}
        </button>
      ))}

      <button
        disabled={pageNum === totalPages}
        onClick={() => setPageNum(pageNum + 1)}
      >
        Next
      </button>

      <br />
      <label>Results per page:</label>
      <select
        value={pageSize}
        onChange={(p) => {
          setPageSize(Number(p.target.value));
          setPageNum(1);
        }}
      >
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
      </select>
    </>
  );
}

export default BookList;
