using MediatR;

namespace SysTicket.Application.Commands.Users
{
    public record RemoveUserCommand(int UserId) : IRequest;
}