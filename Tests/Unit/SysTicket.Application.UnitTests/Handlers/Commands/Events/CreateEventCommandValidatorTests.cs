using AutoFixture;
using FluentValidation;
using Moq;
using NUnit.Framework;
using SysTicket.Application.Commands.Events;
using SysTicket.Application.Handlers.Commands.Events;
using SysTicket.Application.UnitTests.Common;
using SysTicket.Domain.Interfaces.Repositories;

namespace SysTicket.Application.UnitTests.Handlers.Commands.Events
{
    [TestFixture]
    internal class CreateEventCommandValidatorTests : TestBase<CreateEventCommandValidator>
    {
        [Test]
        public void Validate_Should_Throw_Exception_When_Body_Empty()
        {
            // Arrange
            var command = new CreateEventCommand(
               Title: "abcdef",
               Body: String.Empty,
               DateFrom: default,
               DateTo: default,
               UserId: 1,
               LogoBase64: Guid.NewGuid().ToString()
            );

            Fixture.Freeze<Mock<IUsersRepository>>()
               .Setup(x => x.IsUserExistById(1))
               .Returns(Task.FromResult(true));

            // Assert
            Assert.Throws<ValidationException>(() =>
            {
                // Act
                Service.ValidateAndThrow(command);
            });
        }

        [Test]
        public void Validate_Should_Throw_Exception_When_DateFrom_Latest_Than_DateTo()
        {
            // Arrange
            var command = new CreateEventCommand(
               Title: Guid.NewGuid().ToString(),
               Body: Guid.NewGuid().ToString(),
               DateFrom: DateTime.Now.AddDays(1),
               DateTo: DateTime.Now,
               UserId: 1,
               LogoBase64: Guid.NewGuid().ToString()
            );

            Fixture.Freeze<Mock<IUsersRepository>>()
               .Setup(x => x.IsUserExistById(1))
               .Returns(Task.FromResult(true));

            // Assert
            Assert.Throws<ValidationException>(() =>
            {
                // Act
                Service.ValidateAndThrow(command);
            });
        }

        [Test]
        public void Validate_Should_Throw_Exception_When_Logo_Is_Empty()
        {
            // Arrange
            var command = new CreateEventCommand(
               Title: Guid.NewGuid().ToString(),
               Body: Guid.NewGuid().ToString(),
               DateFrom: DateTime.Now,
               DateTo: DateTime.Now,
               UserId: 1,
               LogoBase64: ""
            );

            Fixture.Freeze<Mock<IUsersRepository>>()
               .Setup(x => x.IsUserExistById(1))
               .Returns(Task.FromResult(true));

            // Assert
            Assert.Throws<ValidationException>(() =>
            {
                // Act
                Service.ValidateAndThrow(command);
            });
        }

        [Test]
        public void Validate_Should_Throw_Exception_When_Title_Empty()
        {
            // Arrange
            var command = new CreateEventCommand(
               Title: "",
               Body: Guid.NewGuid().ToString(),
               DateFrom: default,
               DateTo: default,
               UserId: 1,
               LogoBase64: Guid.NewGuid().ToString()
            );

            Fixture.Freeze<Mock<IUsersRepository>>()
                .Setup(x => x.IsUserExistById(1))
                .Returns(Task.FromResult(true));

            // Assert
            Assert.Throws<ValidationException>(() =>
            {
                // Act
                Service.ValidateAndThrow(command);
            });
        }

        [Test]
        public void Validate_Should_Throw_Exception_When_Title_Length_Less_Than_3()
        {
            // Arrange
            var command = new CreateEventCommand(
               Title: "ab",
               Body: Guid.NewGuid().ToString(),
               DateFrom: default,
               DateTo: default,
               UserId: 1,
               LogoBase64: Guid.NewGuid().ToString()
            );

            Fixture.Freeze<Mock<IUsersRepository>>()
               .Setup(x => x.IsUserExistById(1))
               .Returns(Task.FromResult(true));

            // Assert
            Assert.Throws<ValidationException>(() =>
            {
                // Act
                Service.ValidateAndThrow(command);
            });
        }

        [Test]
        public void Validate_Should_Throw_Exception_When_Title_Length_Over_128()
        {
            // Arrange
            var command = new CreateEventCommand(
               Title: "aaaaaaaaaaaaaaaaaaabbbbbbbbbbbbbbbbbbbbcccccccccccccccccccccccccccccccdddddddddddddddddddddddddddeeeeeeeeeeeeeeeeeeeeeeeeeeefffffff",
               Body: Guid.NewGuid().ToString(),
               DateFrom: default,
               DateTo: default,
               UserId: 1,
               LogoBase64: Guid.NewGuid().ToString()
            );

            Fixture.Freeze<Mock<IUsersRepository>>()
               .Setup(x => x.IsUserExistById(1))
               .Returns(Task.FromResult(true));

            // Assert
            Assert.Throws<ValidationException>(() =>
            {
                // Act
                Service.ValidateAndThrow(command);
            });
        }

        [Test]
        public void Validate_Should_Throw_Exception_When_User_Does_Not_Exists()
        {
            // Arrange
            var command = new CreateEventCommand(
               Title: Guid.NewGuid().ToString(),
               Body: Guid.NewGuid().ToString(),
               DateFrom: DateTime.Now,
               DateTo: DateTime.Now,
               UserId: 1,
               LogoBase64: ""
            );

            Fixture.Freeze<Mock<IUsersRepository>>()
               .Setup(x => x.IsUserExistById(1))
               .Returns(Task.FromResult(false));

            // Assert
            Assert.Throws<ValidationException>(() =>
            {
                // Act
                Service.ValidateAndThrow(command);
            });
        }
    }
}