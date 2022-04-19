namespace SysTicket.Application.DTO.Users
{
    public class UserDTO
    {
        public int Id { get; set; }

        public bool IsAdmin { get; set; }

        public string Name { get; set; } = default!;
    }
}