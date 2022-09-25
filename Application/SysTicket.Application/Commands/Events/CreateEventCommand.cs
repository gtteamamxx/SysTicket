using MediatR;
using SysTicket.Application.Interfaces.Common;
using SysTicket.Domain.Interfaces.Domain.Events;

namespace SysTicket.Application.Commands.Events
{
    public record CreateEventCommand(
        string Title,
        string Body,
        DateTime DateFrom,
        DateTime DateTo,
        int UserId,
        string LogoBase64
    ) : IRequest<IEntityId>, ICreateEvent;
}