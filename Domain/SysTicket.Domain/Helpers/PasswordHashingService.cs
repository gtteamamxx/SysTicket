using System.Security.Cryptography;
using System.Text;
using SysTicket.Domain.Interfaces.Helpers;

namespace SysTicket.Domain.Helpers
{
    public class PasswordHashingService : IPasswordHashingService
    {
        public string HashPassword(string input)
        {
            using SHA256? sha256 = SHA256.Create();
            return BitConverter.ToString(sha256.ComputeHash(Encoding.UTF8.GetBytes(input))).Replace("-", "");
        }
    }
}
