using MediatR;
using Microsoft.AspNetCore.Mvc;
using SysTicket.API.Models.Requests.Users;
using SysTicket.Application.Commands.Users;
using SysTicket.Application.DTO.Users;
using SysTicket.Application.Queries.Users;
using SysTicket.Domain.Interfaces.Common;

namespace SysTicket.API.Controllers.Users
{
    [Route("api/users")]
    [ApiController]
    public class UsersController
    {
        private readonly IMediator _mediator;
        private readonly ISysTicketUnitOfWork _sysTicketUnitOfWork;

        public UsersController(
            IMediator mediator,
            ISysTicketUnitOfWork sysTicketUnitOfWork)
        {
            _mediator = mediator;
            _sysTicketUnitOfWork = sysTicketUnitOfWork;
        }

        [HttpPost]
        public async Task CreateUserAsync([FromBody] CreateUserRequest createUserRequest, CancellationToken cancellationToken)
        {
            await _mediator.Send(new CreateUserCommand(
                        UserName: createUserRequest.UserName!,
                        Password: createUserRequest.Password!,
                        IsAdmin: createUserRequest.IsAdmin),
                        cancellationToken
                    );

            await _sysTicketUnitOfWork.SaveChangesAsync(cancellationToken);
        }

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

        [HttpDelete("{id}")]
        public async Task RemoveUserAsync([FromRoute] int id, CancellationToken cancellationToken)
        {
            await _mediator.Send(new RemoveUserCommand(UserId: id),
                cancellationToken
            );

            await _sysTicketUnitOfWork.SaveChangesAsync(cancellationToken);
        }
    }
}