using FluentAssertions;
using FluentValidation;
using NUnit.Framework;
using SysTicket.Application.Commands.Users;
using SysTicket.Application.IntegrationTests.Common;

namespace SysTicket.Application.IntegrationTests.Commands.Users
{
    [TestFixture]
    public class CreateUserCommandTests : TestBase
    {
        [Test]
        public async Task Should_Add_User_To_Database()
        {
            // Arrange
            string expectedUserName = "Test";
            string password = "Test2";
            string expectedPassword = "32E6E1E134F9CC8F14B05925667C118D19244AEBCE442D6FECD2AC38CDC97649";

            // Act
            await Mediator.Send(new CreateUserCommand(
                UserName: expectedUserName,
                Password: password)
            );

            // Assert
            Context.Users
                .FirstOrDefault(x => x.Name == expectedUserName && x.Password == expectedPassword)
                .Should()
                .NotBeNull();
        }

        [Test]
        public void Should_Throw_Exception_When_Name_And_Password_Are_Null()
        {
            // Arrange
            string? expectedUserName = null;
            string? expectedPassword = null;

            // Assert
            Assert.ThrowsAsync<ValidationException>(async () =>
            {
                // Act
                await Mediator.Send(new CreateUserCommand(
                    UserName: expectedUserName!,
                    Password: expectedPassword!)
                );
            });
        }
    }
}