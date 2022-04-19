using System.ComponentModel.DataAnnotations;

namespace SysTicket.Domain.Entities
{
    public class User
    {
        public User(string name, string password, bool isAdmin)
        {
            Name = name;
            Password = password;
            IsAdmin = isAdmin;
        }

        internal User()
        {
        }

        [Key]
        public int Id { get; set; }

        public bool IsAdmin { get; set; }

        [StringLength(100)]
        public string? Name { get; set; }

        [StringLength(64)]
        public string? Password { get; set; }
    }
}