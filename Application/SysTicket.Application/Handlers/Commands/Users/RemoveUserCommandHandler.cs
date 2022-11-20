using SysTicket.Application.Commands.Users;
using SysTicket.Common.CQRS;
using SysTicket.Domain.Interfaces.Common;
using SysTicket.Domain.Interfaces.Repositories;

namespace SysTicket.Application.Handlers.Commands.Users
{
    internal class RemoveUserCommandHandler : CommandHandler<RemoveUserCommand>
    {
        private readonly ISysTicketUnitOfWork _sysTicketUnitOfWork;
        private readonly IUsersRepository _usersRepository;

        public RemoveUserCommandHandler(
            IUsersRepository usersRepository,
            ISysTicketUnitOfWork sysTicketUnitOfWork)
        {
            _usersRepository = usersRepository;
            _sysTicketUnitOfWork = sysTicketUnitOfWork;
        }

        public override async Task Handle(RemoveUserCommand request, CancellationToken cancellationToken)
        {
            await _usersRepository.RemoveUserAsync(request.UserId, cancellationToken);

            await _sysTicketUnitOfWork.SaveChangesAsync(cancellationToken);
        }
    }
}