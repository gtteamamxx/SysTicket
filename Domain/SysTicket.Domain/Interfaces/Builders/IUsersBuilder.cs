using SysTicket.Domain.Entities;

namespace SysTicket.Domain.Interfaces.Builders
{
    public interface IUsersBuilder
    {
        User Create(string name, string password, bool isAdmin);
    }
}