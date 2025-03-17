import { useEffect, useState } from "react";
import { Book } from "./types/Book";

function BookList() {
    
    const [books, setBooks] = useState<Book[]>([]);

    useEffect(() => {
        const fetchBooks = async () => {
            const response = await fetch('https://localhost:5000/api/Book')
            const data = await response.json();
            setBooks(data);
        };

        fetchBooks();
    }, []);
    
    return (
       
       
       <>
            <h1>Books</h1>
            {books.map((b) =>
                <div id="bookCard" key={b.bookID}>
                    <h3>{b.title}</h3>

                    <ul>
                        <li>Author: {b.author}</li>
                        <li>Publisher: {b.publisher}</li>
                        <li>ISBN: {b.isbn}</li>
                        <li>Category: {b.category}</li>
                        <li>Page Count: {b.pageCount}</li>
                        <li>Price: {b.price}</li>
                    </ul>
                </div>
            )}
        </>
    );
}

export default BookList;