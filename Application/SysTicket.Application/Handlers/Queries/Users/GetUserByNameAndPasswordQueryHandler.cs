using MediatR;
using SysTicket.Application.DTO.Users;
using SysTicket.Application.Interfaces.Common;
using SysTicket.Application.Queries.Users;
using SysTicket.Domain.Entities;
using SysTicket.Domain.Interfaces.Helpers;
using SysTicket.Domain.Interfaces.Repositories;

namespace SysTicket.Application.Handlers.Queries.Users
{
    public class GetUserByNameAndPasswordQueryHandler : IRequestHandler<GetUserByNameAndPasswordQuery, UserDTO?>
    {
        private readonly ISysTicketMapper _mapper;
        private readonly IPasswordHashingService _passwordHashingService;
        private readonly IUsersRepository _usersRepository;

        public GetUserByNameAndPasswordQueryHandler(
            ISysTicketMapper mapper,
            IPasswordHashingService passwordHashingService,
            IUsersRepository usersRepository)
        {
            _mapper = mapper;
            _passwordHashingService = passwordHashingService;
            _usersRepository = usersRepository;
        }

        public async Task<UserDTO?> Handle(GetUserByNameAndPasswordQuery request, CancellationToken cancellationToken)
        {
            string hashedPassword = _passwordHashingService.HashPassword(request.Password);

            User? user = await _usersRepository.GetUserByNameAndPasswordAsync(
                request.Name,
                hashedPassword,
                cancellationToken
            );

            UserDTO? userDto = _mapper.Map<UserDTO?>(user);

            return userDto;
        }
    }
}