using FluentValidation;
using FluentValidation.Results;
using SysTicket.Application.Commands.Users;
using SysTicket.Common.Extensions;
using SysTicket.Domain.Interfaces.Repositories;

namespace SysTicket.Application.Handlers.Commands.Users
{
    internal class RemoveUserCommandValidator : AbstractValidator<RemoveUserCommand>
    {
        private readonly IUsersRepository _usersRepository;

        public RemoveUserCommandValidator(IUsersRepository usersRepository)
        {
            _usersRepository = usersRepository;

            RuleFor(x => x.UserId).IsId();
        }

        public override async Task<ValidationResult> ValidateAsync(ValidationContext<RemoveUserCommand> context, CancellationToken cancellation = default)
        {
            await CheckExistance(context);

            return await base.ValidateAsync(context, cancellation);
        }

        private async Task CheckExistance(ValidationContext<RemoveUserCommand> context)
        {
            if (!await _usersRepository.IsUserExistById(context.InstanceToValidate.UserId))
            {
                context.AddFailure($"Użytkownik o id {context.InstanceToValidate.UserId} nie istnieje");
            }
        }
    }
}