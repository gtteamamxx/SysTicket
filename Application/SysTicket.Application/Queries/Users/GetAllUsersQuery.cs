using MediatR;
using SysTicket.Application.DTO.Users;

namespace SysTicket.Application.Queries.Users
{
    public class GetAllUsersQuery : IRequest<IReadOnlyCollection<UserDTO>>
    {
    }
}