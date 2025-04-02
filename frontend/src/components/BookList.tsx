import { useEffect, useState } from 'react';
import { Book } from '../types/Book';
import { useNavigate } from 'react-router-dom';
import { fetchBooks } from '../api/BooksAPI';
import Pagination from './Pagination';

function BookList({ selectedCategories }: { selectedCategories: string[] }) {
  const [books, setBooks] = useState<Book[]>([]);
  const [pageSize, setPageSize] = useState<number>(5);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [isSorted, setIsSorted] = useState<number>(0);
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        setLoading(true);
        const data = await fetchBooks(
          pageSize,
          pageNum,
          isSorted,
          selectedCategories
        );

        setBooks(data.books);
        setTotalPages(Math.ceil(data.totalBooks / pageSize));
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };
    loadBooks();
  }, [pageSize, pageNum, isSorted, selectedCategories]);

  if (loading) return <p>Loading projects...</p>;
  if (error) return <p className="text-red-500">Error {error}</p>;

  return (
    <>
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
                <strong>Classification: </strong>
                {b.classification}
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

            <button
              className="btn btn-success"
              onClick={() => navigate(`/buy/${b.bookID}/${b.title}/${b.price}`)}
            >
              Buy
            </button>
          </div>
        </div>
      ))}

      <Pagination
        currentPage={pageNum}
        totalPages={totalPages}
        pageSize={pageSize}
        onPageChange={setPageNum}
        onPageSizeChange={(newSize) => {
          setPageSize(newSize);
          setPageNum(1);
        }}
      />
    </>
  );
}

export default BookList;
