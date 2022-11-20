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
            => await _context.Users.AddAsync(user, cancellationToken);

        public async Task<IReadOnlyCollection<User>> GetAllUsersAsync(CancellationToken cancellationToken)
            => (await _context.Users.ToListAsync(cancellationToken)).AsReadOnly();

        public async Task<User?> GetUserByNameAndPasswordAsync(string name, string password, CancellationToken cancellationToken)
            => await _context.Users.FirstOrDefaultAsync(x => x.Name == name && x.Password == password, cancellationToken: cancellationToken);

        public async Task<bool> IsUserExistById(int id)
             => await _context.Users.AnyAsync(x => x.Id == id);

        public async Task<bool> IsUserExistByUserName(string name)
            => await _context.Users.AnyAsync(x => x.Name == name);

        public async Task RemoveUserAsync(int userId, CancellationToken cancellationToken)
        {
            User? user = await _context.Users.FindAsync(userId);

            _context.Users.Remove(user!);
        }
    }
}