using MediatR;
using SysTicket.Application.Commands.Users;
using SysTicket.Domain.Interfaces.Common;
using SysTicket.Domain.Interfaces.Factories;

namespace SysTicket.Application.Handlers.Commands.Users
{
    public class CreateUserCommandHandler : IRequestHandler<CreateUserCommand>
    {
        private readonly IUsersFactory _usersFactory;
        private readonly ISysTicketUnitOfWork _sysTicketUnitOfWork;

        public CreateUserCommandHandler(
            IUsersFactory usersFactory,
            ISysTicketUnitOfWork sysTicketUnitOfWork)
        {
            _usersFactory = usersFactory;
            _sysTicketUnitOfWork = sysTicketUnitOfWork;
        }

        public async Task<Unit> Handle(CreateUserCommand request, CancellationToken cancellationToken)
        {
            await _usersFactory.CreateUserAsync(request, cancellationToken);

            await _sysTicketUnitOfWork.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}
