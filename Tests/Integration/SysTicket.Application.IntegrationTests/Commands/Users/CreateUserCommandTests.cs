using FluentAssertions;
using FluentValidation;
using NUnit.Framework;
using SysTicket.Application.Commands.Users;
using SysTicket.Application.IntegrationTests.Common;
using SysTicket.Domain.Entities;

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
            string password = "Test2345";
            string expectedPassword = "647613861bb5ae3daacd079d2e98d3fabc342b7bf32a69d1e34e401182b90d06".ToUpper();
            bool isAdmin = false;

            // Act
            await Mediator.Send(new CreateUserCommand(
                UserName: expectedUserName,
                Password: password,
                IsAdmin: isAdmin)
            );

            await UnitOfWork.SaveChangesAsync(default);

            // Assert
            Context.Users
                .FirstOrDefault(x => x.Name == expectedUserName
                    && x.Password == expectedPassword
                    && x.IsAdmin == isAdmin)
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
                    Password: expectedPassword!,
                    IsAdmin: false)
                );
            });
        }

        [Test]
        public void Should_Throw_Exception_When_Name_Length_Is_Greater_Than_3_Chars()
        {
            // Arrange
            string? expectedUserName
                = string.Join("", Enumerable.Range(0, 33).Select(x => "a"));
            string? expectedPassword = "12345678";

            // Assert
            Assert.ThrowsAsync<ValidationException>(async () =>
            {
                // Act
                await Mediator.Send(new CreateUserCommand(
                    UserName: expectedUserName!,
                    Password: expectedPassword!,
                    IsAdmin: false)
                );
            });
        }

        [Test]
        public void Should_Throw_Exception_When_Name_Length_Is_Less_Than_3_Chars()
        {
            // Arrange
            string? expectedUserName = "ka";
            string? expectedPassword = "12345678";

            // Assert
            Assert.ThrowsAsync<ValidationException>(async () =>
            {
                // Act
                await Mediator.Send(new CreateUserCommand(
                    UserName: expectedUserName!,
                    Password: expectedPassword!,
                    IsAdmin: false)
                );
            });
        }

        [Test]
        public void Should_Throw_Exception_When_Password_Length_Is_Less_Than_8_Chars()
        {
            // Arrange
            string? expectedUserName = "kas";
            string? expectedPassword = "1234";

            // Assert
            Assert.ThrowsAsync<ValidationException>(async () =>
            {
                // Act
                await Mediator.Send(new CreateUserCommand(
                    UserName: expectedUserName!,
                    Password: expectedPassword!,
                    IsAdmin: false)
                );
            });
        }

        [Test]
        public void Should_Throw_Exception_When_User_Name_Already_Exists()
        {
            // Arrange
            string name = "test";

            Context.Users.Add(new User()
            {
                Name = name
            });

            Context.SaveChanges();

            // Assert
            Assert.ThrowsAsync<ValidationException>(async () =>
            {
                // Act
                await Mediator.Send(new CreateUserCommand(
                    UserName: name,
                    Password: "12345678",
                    IsAdmin: false)
                );
            });
        }
    }
}