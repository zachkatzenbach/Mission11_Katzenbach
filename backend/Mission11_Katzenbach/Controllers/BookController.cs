using System.Collections;
using System.Security.AccessControl;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Mission11_Katzenbach.Data;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

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

        [HttpGet("AllBooks")]
        public IActionResult GetBooks(int pageSize = 5, int pageNum = 1, int isSorted = 0, [FromQuery] List<string>? bookCategories = null)
        {
            var booksQuery = _bookContext.Books.AsQueryable();

            if (bookCategories != null && bookCategories.Any())
            {
                booksQuery = booksQuery.Where(b => bookCategories.Contains(b.Category));
            }

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

            var totalBooks = booksQuery.Count();

            var bookObject = new
            {
                Books = books,
                TotalBooks = totalBooks
            };

            return Ok(bookObject);
        }

        [HttpGet("GetBookCategories")]
        public IActionResult GetProjectTypes()
        {
            var projectTypes = _bookContext.Books
                .Select(p => p.Category)
                .Distinct()
                .ToList();

            return Ok(projectTypes);
        }
    }
}
