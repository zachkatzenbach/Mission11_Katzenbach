using System.ComponentModel.DataAnnotations;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace Mission11_Katzenbach.Data
{
    public class Book
    {
        [Key]
        public int BookID {get; set;}
        [Required]
        public string Title { get; set; }
        [Required]
        public string Author { get; set; }
        [Required]
        public string Publisher { get; set; }
        [Required]
        public string ISBN { get; set; }
        [Required]
        public string Category { get; set; }
        [Required]
        public string PageCount { get; set; }
        [Required]
        public float Price { get; set; }
    }
}
