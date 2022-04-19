using MediatR;
using SysTicket.Application.DTO.Users;
using SysTicket.Application.Interfaces.Common;
using SysTicket.Application.Queries.Users;
using SysTicket.Domain.Entities;
using SysTicket.Domain.Interfaces.Repositories;

namespace SysTicket.Application.Handlers.Queries.Users
{
    internal class GetAllUsersQueryHandler : IRequestHandler<GetAllUsersQuery, IReadOnlyCollection<UserDTO>>
    {
        private readonly ISysTicketMapper _sysTicketMapper;
        private readonly IUsersRepository _usersRepository;

        public GetAllUsersQueryHandler(
            IUsersRepository usersRepository,
            ISysTicketMapper sysTicketMapper)
        {
            _usersRepository = usersRepository;
            _sysTicketMapper = sysTicketMapper;
        }

        public async Task<IReadOnlyCollection<UserDTO>> Handle(GetAllUsersQuery request, CancellationToken cancellationToken)
        {
            IReadOnlyCollection<User> allUsers = await _usersRepository.GetAllUsersAsync(cancellationToken);

            var result = _sysTicketMapper.Map<List<UserDTO>>(allUsers);

            return result;
        }
    }
}