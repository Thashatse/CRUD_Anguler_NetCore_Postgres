using System.ComponentModel.DataAnnotations;

namespace Data.Models
{
    public class Users
    {
        [Key]
        public long id { get; set; }
        public string username { get; set; }
        public string password { get; set; }
    }
}
