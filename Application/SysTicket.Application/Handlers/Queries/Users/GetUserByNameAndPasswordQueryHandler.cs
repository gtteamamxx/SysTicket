using MediatR;
using SysTicket.Application.DTO.Users;
using SysTicket.Application.Interfaces.Common;
using SysTicket.Application.Queries.Users;
using SysTicket.Domain.Entities;
using SysTicket.Domain.Interfaces.Repositories;

namespace SysTicket.Application.Handlers.Queries.Users
{
    public class GetUserByNameAndPasswordQueryHandler : IRequestHandler<GetUserByNameAndPasswordQuery, UserDTO?>
    {
        private readonly ISysTicketMapper _mapper;
        private readonly IUsersRepository _usersRepository;

        public GetUserByNameAndPasswordQueryHandler(
            ISysTicketMapper mapper,
            IUsersRepository usersRepository)
        {
            _mapper = mapper;
            _usersRepository = usersRepository;
        }

        public async Task<UserDTO?> Handle(GetUserByNameAndPasswordQuery request, CancellationToken cancellationToken)
        {
            User? user = await _usersRepository.GetUserByNameAndPasswordAsync(
                request.Name,
                request.Password,
                cancellationToken
            );

            UserDTO? userDto = _mapper.Map<UserDTO?>(user);

            return userDto;
        }
    }
}
