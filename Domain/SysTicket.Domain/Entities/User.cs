using System.ComponentModel.DataAnnotations;
using SysTicket.Domain.Interfaces.Common;

namespace SysTicket.Domain.Entities
{
    public class User : IId
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

        public virtual ICollection<Event> Events { get; set; } = new HashSet<Event>();

        [Key]
        public int Id { get; set; }

        public bool IsAdmin { get; set; }

        [StringLength(32)]
        public string? Name { get; set; }

        [StringLength(64)]
        public string? Password { get; set; }
    }
}