using System.ComponentModel.DataAnnotations;

namespace Data.Models
{
    public class Contact
    {
        [Key]
        public long id { get; set; }
        public string name { get; set; } = string.Empty;
        public string surname { get; set; } = string.Empty;
        [MaxLength(9)]
        public decimal telephonenumber { get; set; }
        [EmailAddress]
        public string emailaddresss { get; set; } = string.Empty;
        public DateTime dateofbirth { get; set; }
    }
}
