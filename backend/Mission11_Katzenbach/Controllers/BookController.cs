using System.Collections;
using System.Security.AccessControl;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Mission11_Katzenbach.Data;

namespace Mission11_Katzenbach.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private BookDbContext _bookContext;

        public BookController(BookDbContext temp)
        {
            _bookContext = temp;
        }

        [HttpGet]
        public IActionResult GetBooks(int pageSize = 5, int pageNum = 1, int isSorted = 0)
        {
            IQueryable<Book> booksQuery = _bookContext.Books;

            //Sort all books before sending to frontend
            if (isSorted == 1)
            {
                booksQuery = booksQuery.OrderBy(b => b.Title); // Change to appropriate sorting field
            }

            // Apply pagination (after sorting)
            var books = booksQuery
                .Skip((pageNum - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            var totalBooks = _bookContext.Books.Count();

            var bookObject = new
            {
                Books = books,
                TotalBooks = totalBooks
            };

            return Ok(bookObject);
        }
    }
}
