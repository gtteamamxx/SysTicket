namespace SysTicket.Domain.Interfaces.Helpers
{
    public interface IPasswordHashingService
    {
        string HashPassword(string input);
    }
}