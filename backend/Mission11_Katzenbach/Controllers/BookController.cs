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

        public IEnumerable<Book> GetBooks()
        {
            var books = _bookContext.Books.ToList();

            return books;
        }
    }
}
