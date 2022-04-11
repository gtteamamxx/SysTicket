using FluentValidation;
using SysTicket.Application.Commands.Users;

namespace SysTicket.Application.Handlers.Commands.Users
{
    internal class CreateUserCommandValidator : AbstractValidator<CreateUserCommand>
    {
        public CreateUserCommandValidator()
        {
            RuleFor(x => x.UserName)
                .NotEmpty();
           
            RuleFor(x => x.Password)
                .NotEmpty();
        }
    }
}
