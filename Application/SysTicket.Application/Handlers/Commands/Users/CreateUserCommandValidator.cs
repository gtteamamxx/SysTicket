using FluentValidation;
using FluentValidation.Results;
using SysTicket.Application.Commands.Users;
using SysTicket.Domain.Interfaces.Repositories;

namespace SysTicket.Application.Handlers.Commands.Users
{
    internal class CreateUserCommandValidator : AbstractValidator<CreateUserCommand>
    {
        private readonly IUsersRepository _usersRepository;

        public CreateUserCommandValidator(IUsersRepository usersRepository)
        {
            _usersRepository = usersRepository;

            RuleFor(x => x.UserName)
                .NotEmpty()
                .Length(3, 32);

            RuleFor(x => x.Password)
                .NotEmpty()
                .MinimumLength(8);
        }

        public override async Task<ValidationResult> ValidateAsync(ValidationContext<CreateUserCommand> context, CancellationToken cancellation = default)
        {
            await CheckDuplicateAsync(context);

            return await base.ValidateAsync(context, cancellation);
        }

        private async Task CheckDuplicateAsync(ValidationContext<CreateUserCommand> context)
        {
            if (await _usersRepository.IsUserExistWithUserName(context.InstanceToValidate.UserName))
            {
                context.AddFailure("Nazwa użytkownika jest już zajęta.");
            }
        }
    }
}