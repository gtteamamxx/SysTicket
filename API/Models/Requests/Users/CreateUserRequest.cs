namespace SysTicket.API.Models.Requests.Users
{
    public class CreateUserRequest
    {
        public bool IsAdmin { get; set; }

        public string? Password { get; set; }

        public string? UserName { get; set; }
    }
}