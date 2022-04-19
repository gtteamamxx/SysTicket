namespace SysTicket.Domain.Interfaces.Domain.Users
{
    public interface ICreateUser
    {
        bool IsAdmin { get; }

        string Password { get; }

        string UserName { get; }
    }
}