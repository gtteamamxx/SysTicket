using SysTicket.Application.Commands.Users;
using SysTicket.Common.CQRS;
using SysTicket.Domain.Interfaces.Factories;

namespace SysTicket.Application.Handlers.Commands.Users
{
    public class CreateUserCommandHandler : CommandHandler<CreateUserCommand>
    {
        private readonly IUsersFactory _usersFactory;

        public CreateUserCommandHandler(IUsersFactory usersFactory)
        {
            _usersFactory = usersFactory;
        }

        public override Task Handle(CreateUserCommand request, CancellationToken cancellationToken)
            => _usersFactory.CreateUserAsync(request, cancellationToken);
    }
}