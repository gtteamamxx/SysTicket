using MediatR;
using Microsoft.AspNetCore.Mvc;
using SysTicket.API.Models.Requests.Users;
using SysTicket.Application.Commands.Users;
using SysTicket.Application.DTO.Users;
using SysTicket.Application.Queries.Users;

namespace SysTicket.API.Controllers.Users
{
    [Route("api/users")]
    [ApiController]
    public class UsersController
    {
        private readonly IMediator _mediator;

        public UsersController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public Task<UserDTO?> GetUser(string name, string password)
            => _mediator.Send(new GetUserByNameAndPasswordQuery(
                Name: name,
                Password: password)
            );

        [HttpPost]
        public Task CreateUserAsync([FromBody] CreateUserRequest createUserRequest)
            => _mediator.Send(new CreateUserCommand(
                UserName: createUserRequest.UserName!,
                Password: createUserRequest.Password!)
            );
    }
}
