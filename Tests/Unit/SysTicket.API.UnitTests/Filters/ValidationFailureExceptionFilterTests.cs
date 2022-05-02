using FluentAssertions;
using FluentValidation;
using FluentValidation.Results;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Abstractions;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Routing;
using NUnit.Framework;
using System.Security.Claims;
using SysTicket.API.UnitTests.Models;

namespace SysTicket.API.Filters
{
    [TestFixture]
    internal class ValidationFailureExceptionFilterTests
    {
        [Test]
        public void OnException_Should_Handle_ValidationException()
        {
            // Arrange
            var context = new ExceptionContext(
                new ActionContext()
                {
                    HttpContext = new HttpContextTestModel(),
                    RouteData = new RouteData(),
                    ActionDescriptor = new ActionDescriptor()
                },
                new List<IFilterMetadata>()
            );

            string messageTest = "Some exception message";

            context.Exception = new ValidationException(new[]
            {
                new ValidationFailure(propertyName: null, errorMessage: messageTest)
            });

            // Act
            new ValidationFailureExceptionFilter().OnException(context);

            // Assert
            context.ExceptionHandled.Should().BeTrue();

            context.Result.Should().BeOfType<JsonResult>();

            ((JsonResult)context.Result!).Value!.ToString().Should().Contain(messageTest);
        }
    }
}