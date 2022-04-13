using FluentAssertions;
using NUnit.Framework;
using SysTicket.Application.DTO.Users;
using SysTicket.Application.IntegrationTests.Common;
using SysTicket.Application.Queries.Users;
using SysTicket.Domain.Entities;

namespace SysTicket.Application.IntegrationTests.Queries
{
    [TestFixture]
    internal class GetUserByNameAndPasswordQueryTests : TestBase
    {
        [Test]
        public async Task Should_Return_User_By_Name_And_Password()
        {
            // Arrange
            var expectedUser = new User()
            {
                Name = "test",
                Password = "test"
            };

            Context.Users.Add(expectedUser);

            Context.SaveChanges();

            // Act
            UserDTO? result 
                = await Mediator.Send(new GetUserByNameAndPasswordQuery(expectedUser.Name, expectedUser.Password));

            // Assert
            result.Should().NotBeNull();

            result!.Id.Should().Be(expectedUser.Id);

            result!.Name.Should().Be(expectedUser.Name);
        }
    }
}
