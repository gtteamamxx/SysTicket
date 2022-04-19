using AutoFixture;
using FluentAssertions;
using Moq;
using NUnit.Framework;
using SysTicket.Application.DTO.Users;
using SysTicket.Application.Handlers.Queries.Users;
using SysTicket.Application.Interfaces.Common;
using SysTicket.Application.Queries.Users;
using SysTicket.Application.UnitTests.Common;
using SysTicket.Domain.Entities;
using SysTicket.Domain.Interfaces.Helpers;
using SysTicket.Domain.Interfaces.Repositories;

namespace SysTicket.Application.UnitTests.Handlers.Queries.Users
{
    [TestFixture]
    internal class GetUserByNameAndPasswordQueryHandlerTests : TestBase<GetUserByNameAndPasswordQueryHandler>
    {
        [Test]
        public async Task Should_Get_User_By_Name_And_Hashed_Password()
        {
            // Arrange
            var command = new GetUserByNameAndPasswordQuery(
                Name: "test",
                Password: "Test2"
            );

            string expectedPassword = "expectedPassword";

            var usersRepositoryMock = Fixture.Freeze<Mock<IUsersRepository>>();

            Fixture.Freeze<Mock<IPasswordHashingService>>()
                .Setup(x => x.HashPassword(command.Password))
                .Returns(expectedPassword);

            // Act
            await Service.Handle(command, default);

            // Assert
            usersRepositoryMock.Verify(x => x.GetUserByNameAndPasswordAsync(
                command.Name,
                expectedPassword,
                default)
            );
        }

        [Test]
        public async Task Should_Map_Result_To_Dto()
        {
            // Arrange
            var user = new User()
            {
                Id = 1,
                Name = "Test"
            };

            var expectedUser = new UserDTO();

            Fixture.Freeze<Mock<IUsersRepository>>()
                .Setup(x => x.GetUserByNameAndPasswordAsync(
                    It.IsAny<string>(),
                    It.IsAny<string>(),
                    It.IsAny<CancellationToken>())
                ).Returns(Task.FromResult(user)!);

            Fixture.Freeze<Mock<ISysTicketMapper>>()
                .Setup(x => x.Map<UserDTO>(user))
                .Returns(expectedUser);

            // Act
            UserDTO? result
                = await Service.Handle(new GetUserByNameAndPasswordQuery(default!, default!), default);

            // Assert
            result.Should().Be(expectedUser);
        }
    }
}