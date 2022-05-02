using Microsoft.EntityFrameworkCore;
using SysTicket.Domain.Entities;
using SysTicket.Domain.Interfaces.Repositories;

namespace SysTicket.Infrastructure.Repositories
{
    internal class UsersRepository : IUsersRepository
    {
        private readonly SysTicketContext _context;

        public UsersRepository(SysTicketContext context)
        {
            _context = context;
        }

        public async Task CreateUserAsync(User user, CancellationToken cancellationToken)
            => await _context.AddAsync(user, cancellationToken);

        public async Task<IReadOnlyCollection<User>> GetAllUsersAsync(CancellationToken cancellationToken)
            => (await _context.Users.ToListAsync(cancellationToken)).AsReadOnly();

        public Task<User?> GetUserByNameAndPasswordAsync(string name, string password, CancellationToken cancellationToken)
            => _context.Users.FirstOrDefaultAsync(x => x.Name == name && x.Password == password, cancellationToken: cancellationToken);

        public Task<bool> IsUserExistWithUserName(string name)
            => _context.Users.AnyAsync(x => x.Name == name);
    }
}