using FluentAssertions;
using NUnit.Framework;
using SysTicket.Application.DTO.Users;
using SysTicket.Application.IntegrationTests.Common;
using SysTicket.Application.Queries.Users;
using SysTicket.Domain.Entities;

namespace SysTicket.Application.IntegrationTests.Queries.Users
{
    [TestFixture]
    internal class GetUserByNameAndPasswordQueryTests : TestBase
    {
        [Test]
        public async Task Should_Return_User_By_Name_And_Password()
        {
            // Arrange
            string password = "Test2";

            var expectedUser = new User()
            {
                Name = "test",
                Password = "32E6E1E134F9CC8F14B05925667C118D19244AEBCE442D6FECD2AC38CDC97649"
            };

            Context.Users.Add(expectedUser);

            Context.SaveChanges();

            // Act
            UserDTO? result
                = await Mediator.Send(new GetUserByNameAndPasswordQuery(expectedUser.Name, password));

            // Assert
            result.Should().NotBeNull();

            result!.Id.Should().Be(expectedUser.Id);

            result!.Name.Should().Be(expectedUser.Name);
        }
    }
}