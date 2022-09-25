using FluentAssertions;
using NUnit.Framework;
using SysTicket.Application.Common;
using SysTicket.Application.DTO.Users;
using SysTicket.Application.UnitTests.Common;
using SysTicket.Domain.Entities;

namespace SysTicket.Application.UnitTests.Mapper
{
    [TestFixture]
    internal class SysTicketMapperTests : TestBase<SysTicketMapper>
    {
        [Test]
        public void Map_User_To_User_DTO_Should_Map_Valid_Properties()
        {
            // Arrange
            var user = new User()
            {
                Id = 4,
                Name = "Test 2",
                Password = "Testtest"
            };

            // Act
            UserDTO? result = Service.Map<UserDTO>(user);

            // Assert
            result.Should().NotBeNull();

            result.Id.Should().Be(user.Id);

            result.Name.Should().Be(user.Name);
        }
    }
}