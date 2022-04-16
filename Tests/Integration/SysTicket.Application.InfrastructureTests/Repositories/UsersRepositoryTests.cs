using FluentAssertions;
using NUnit.Framework;
using SysTicket.Application.IntegrationTests.Common;
using SysTicket.Domain.Entities;
using SysTicket.Infrastructure.Repositories;

namespace SysTicket.Application.InfrastructureTests.Repositories
{
    [TestFixture]
    internal class UsersRepositoryTests : RepositoryTestBase<UsersRepository>
    {
        [Test]
        public async Task GetUserByNameAndPassword_Should_Return_User_By_Name_And_Password()
        {
            // Arrange
            var expectedUser = new User()
            {
                Name = "name",
                Password = "password"
            };

            Context.Users.Add(expectedUser);

            Context.SaveChanges();

            // Act
            User? result = await Repository.GetUserByNameAndPasswordAsync(
                name: expectedUser.Name,
                password: expectedUser.Password,
                default
            );

            // Assert
            result.Should().Be(expectedUser);
        }
    }
}
