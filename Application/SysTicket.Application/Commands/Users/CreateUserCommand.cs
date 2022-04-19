using MediatR;
using SysTicket.Domain.Interfaces.Domain.Users;

namespace SysTicket.Application.Commands.Users
{
    public record CreateUserCommand(
        string UserName,
        string Password,
        bool IsAdmin) : IRequest, ICreateUser
    {
    }
}