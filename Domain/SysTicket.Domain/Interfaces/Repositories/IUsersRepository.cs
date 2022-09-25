using SysTicket.Domain.Entities;

namespace SysTicket.Domain.Interfaces.Repositories
{
    public interface IUsersRepository
    {
        Task CreateUserAsync(User user, CancellationToken cancellationToken);

        Task<IReadOnlyCollection<User>> GetAllUsersAsync(CancellationToken cancellationToken);

        Task<User?> GetUserByNameAndPasswordAsync(string name, string password, CancellationToken cancellationToken);

        Task<bool> IsUserExistById(int id);

        Task<bool> IsUserExistByUserName(string name);
    }
}