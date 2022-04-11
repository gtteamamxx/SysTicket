using SysTicket.Domain.Entities;
using SysTicket.Domain.Interfaces.Domain.Users;

namespace SysTicket.Domain.Interfaces.Factories
{
    public interface IUsersFactory
    {
        Task<User> CreateUserAsync(ICreateUser input, CancellationToken cancellationToken);
    }
}
