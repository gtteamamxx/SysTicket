using AutoFixture;
using FluentValidation;
using Moq;
using NUnit.Framework;
using SysTicket.Application.Commands.Users;
using SysTicket.Application.Handlers.Commands.Users;
using SysTicket.Application.UnitTests.Common;
using SysTicket.Domain.Interfaces.Repositories;

namespace SysTicket.Application.UnitTests.Handlers.Commands
{
    [TestFixture]
    internal class CreateUserCommandValidatorTests : TestBase<CreateUserCommandValidator>
    {
        [Test]
        public void Validate_Should_Throw_Exception_When_Name_Empty()
        {
            // Arrange
            var command = new CreateUserCommand(
               UserName: "",
               Password: default!,
               IsAdmin: default
            );

            // Assert
            Assert.Throws<ValidationException>(() =>
            {
                // Act
                Service.ValidateAndThrow(command);
            });
        }

        [Test]
        public void Validate_Should_Throw_Exception_When_Password_Empty()
        {
            // Arrange
            var command = new CreateUserCommand(
               UserName: "Test",
               Password: ""!,
               IsAdmin: false
            );

            // Assert
            Assert.Throws<ValidationException>(() =>
            {
                // Act
                Service.ValidateAndThrow(command);
            });
        }

        [Test]
        public void Validate_Should_Throw_Exception_When_User_Name_Already_Exists()
        {
            // Arrange
            var command = new CreateUserCommand(
                UserName: "SomeName",
                Password: "Some password"!,
                IsAdmin: false
            );

            Fixture.Freeze<Mock<IUsersRepository>>()
                .Setup(x => x.IsUserExistWithUserName(command.UserName))
                .Returns(Task.FromResult(true));

            // Assert
            Assert.ThrowsAsync<ValidationException>(async () =>
            {
                // Act
                await Service.ValidateAndThrowAsync(command);
            });
        }
    }
}