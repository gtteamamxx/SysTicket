using System.ComponentModel.DataAnnotations;

namespace SysTicket.Domain.Entities
{
    public class User
    {
        public User()
        {
        }

        public User(string name, string password)
        {
            Name = name;
            Password = password;
        }

        [Key]
        public int Id { get; set; }

        [StringLength(100)]
        public string? Name { get; set; }

        [StringLength(64)]
        public string? Password { get; set; }
    }
}