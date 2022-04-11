using SysTicket.Domain.Entities;
using SysTicket.Domain.Interfaces.Builders;

namespace SysTicket.Domain.Builders
{
    public class UsersBuilder : IUsersBuilder
    {
        public User Create(string name, string password)
            => new(name, password);
    }
}
