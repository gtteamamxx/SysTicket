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

        [HttpPost]
        public Task CreateUserAsync([FromBody] CreateUserRequest createUserRequest, CancellationToken cancellationToken)
            => _mediator.Send(new CreateUserCommand(
                UserName: createUserRequest.UserName!,
                Password: createUserRequest.Password!,
                IsAdmin: createUserRequest.IsAdmin),
                cancellationToken
            );

        [HttpGet("all")]
        public Task<IReadOnlyCollection<UserDTO>> GetAllUsersAsync(CancellationToken cancellationToken)
            => _mediator.Send(new GetAllUsersQuery(), cancellationToken);

        [HttpGet]
        public Task<UserDTO?> GetUserByNameAndPasswordAsync(string name, string password, CancellationToken cancellationToken)
            => _mediator.Send(new GetUserByNameAndPasswordQuery(
                Name: name,
                Password: password),
                cancellationToken
            );
    }
}