using SysTicket.Domain.Entities;
using SysTicket.Domain.Interfaces.Builders;
using SysTicket.Domain.Interfaces.Domain.Users;
using SysTicket.Domain.Interfaces.Factories;
using SysTicket.Domain.Interfaces.Repositories;

namespace SysTicket.Domain.Factories
{
    public class UsersFactory : IUsersFactory
    {
        private readonly IUsersBuilder _usersBuilder;
        private readonly IUsersRepository _usersRepository;

        public UsersFactory(
            IUsersBuilder usersBuilder,
            IUsersRepository usersRepository)
        {
            _usersBuilder = usersBuilder;
            _usersRepository = usersRepository;
        }

        public async Task<User> CreateUserAsync(ICreateUser input, CancellationToken cancellationToken)
        {
            User user = _usersBuilder.Create(
                name: input.UserName,
                password: input.Password
            );

            await _usersRepository.CreateUserAsync(user, cancellationToken);

            return user;
        }
    }
}
