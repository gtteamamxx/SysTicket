using MediatR;
using SysTicket.Application.Interfaces.Common;
using SysTicket.Domain.Entities;
using SysTicket.Domain.Interfaces.Domain.Events;

namespace SysTicket.Application.Commands.Events
{
    public record CreateEventCommand(
        string Title,
        string Body,
        DateTime DateFrom,
        DateTime DateTo,
        int UserId,
        string LogoBase64,
        string Layout,
        RegionPrices RegionPrices
    ) : IRequest<IEntityId>, ICreateEvent;
}