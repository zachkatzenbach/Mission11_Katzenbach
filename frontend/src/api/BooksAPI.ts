import { Book } from '../types/Book';

interface FetchBooksResponse {
  books: Book[];
  totalBooks: number;
}

const API_URL = 'https://localhost:5000/api/Book';

export const fetchBooks = async (
  pageSize: number,
  pageNum: number,
  isSorted: number,
  selectedCategories: string[]
): Promise<FetchBooksResponse> => {
  try {
    const categoryParams = selectedCategories
      .map((cat) => `bookCategories=${encodeURIComponent(cat)}`)
      .join('&');

    const response = await fetch(
      `${API_URL}/AllBooks/?pageSize=${pageSize}&pageNum=${pageNum}&isSorted=${isSorted}${selectedCategories.length ? `&${categoryParams}` : ''}`,
      {
        credentials: 'include',
      }
    );

    const data: FetchBooksResponse = await response.json();

    // If dropdown is set to sort (isSorted == 1), sort by book title alphabetically
    const sortedBooks =
      isSorted === 1
        ? data.books.sort((a, b) => a.title.localeCompare(b.title))
        : data.books;

    return {
      books: sortedBooks,
      totalBooks: data.totalBooks,
    };
  } catch (error) {
    console.error('Error fetching books: ', error);
    throw error;
  }
};

export const addBook = async (newBook: Book): Promise<Book> => {
  try {
    const response = await fetch(`${API_URL}/AddBook`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newBook),
    });

    if (!response.ok) {
      throw new Error('Failed to add project');
    }

    return await response.json();
  } catch (error) {
    console.error('Error adding project', error);
    throw error;
  }
};

export const updateBook = async (
  bookID: number,
  updatedBook: Book
): Promise<Book> => {
  try {
    const response = await fetch(`${API_URL}/UpdateBook/${bookID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedBook),
    });

    return await response.json();
  } catch (error) {
    console.error('Error updating book', error);
    throw error;
  }
};

export const deleteBook = async (bookID: number): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/DeleteBook/${bookID}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete book');
    }
  } catch (error) {
    console.error('Error deleting book:', error);
  }
};
