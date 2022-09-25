namespace SysTicket.Application.Interfaces.Common
{
    public interface ISysTicketMapper
    {
        T Map<T>(object? entity);
    }
}