using FluentAssertions;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SysTicket.Application.DTO.Users;
using SysTicket.Application.IntegrationTests.Common;
using SysTicket.Application.Queries.Users;
using SysTicket.Domain.Entities;

namespace SysTicket.Application.IntegrationTests.Queries.Users
{
    [TestFixture]
    internal class GetAllUsersQueryTests : TestBase
    {
        [Test]
        public async Task Should_Return_All_Users()
        {
            // Arrange
            var expectedUserOne = new User() { Name = "Test1" };
            var expectedUserTwo = new User() { Name = "Test2" };

            Context.Users.Add(expectedUserOne);
            Context.Users.Add(expectedUserTwo);

            Context.SaveChanges();

            // Act
            IReadOnlyCollection<UserDTO> result = await Mediator.Send(new GetAllUsersQuery());

            // Assert
            result.Should().NotBeNull();

            result.FirstOrDefault(x => x.Name == expectedUserOne.Name).Should().NotBeNull();

            result.FirstOrDefault(x => x.Name == expectedUserTwo.Name).Should().NotBeNull();
        }
    }
}