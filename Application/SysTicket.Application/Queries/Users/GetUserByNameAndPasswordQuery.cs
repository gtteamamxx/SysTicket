using MediatR;
using SysTicket.Application.DTO.Users;

namespace SysTicket.Application.Queries.Users
{
    public record GetUserByNameAndPasswordQuery(string Name, string Password) : IRequest<UserDTO?>
    {
    }
}