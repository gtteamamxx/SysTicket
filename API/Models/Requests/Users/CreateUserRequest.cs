namespace SysTicket.API.Models.Requests.Users
{
    public class CreateUserRequest
    {
        public string? UserName { get; set; }

        public string? Password { get; set; }
    }
}
