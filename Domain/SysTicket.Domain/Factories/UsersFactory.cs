using SysTicket.Domain.Entities;
using SysTicket.Domain.Interfaces.Builders;
using SysTicket.Domain.Interfaces.Domain.Users;
using SysTicket.Domain.Interfaces.Factories;
using SysTicket.Domain.Interfaces.Helpers;
using SysTicket.Domain.Interfaces.Repositories;

namespace SysTicket.Domain.Factories
{
    internal class UsersFactory : IUsersFactory
    {
        private readonly IPasswordHashingService _passwordHashingService;
        private readonly IUsersBuilder _usersBuilder;
        private readonly IUsersRepository _usersRepository;

        public UsersFactory(
            IPasswordHashingService passwordHashingService,
            IUsersBuilder usersBuilder,
            IUsersRepository usersRepository)
        {
            _passwordHashingService = passwordHashingService;
            _usersBuilder = usersBuilder;
            _usersRepository = usersRepository;
        }

        public async Task<User> CreateUserAsync(ICreateUser input, CancellationToken cancellationToken)
        {
            string hashedPassword = _passwordHashingService.HashPassword(input.Password);

            User user = _usersBuilder.Create(
                name: input.UserName,
                password: hashedPassword,
                isAdmin: input.IsAdmin
            );

            await _usersRepository.CreateUserAsync(user, cancellationToken);

            return user;
        }
    }
}