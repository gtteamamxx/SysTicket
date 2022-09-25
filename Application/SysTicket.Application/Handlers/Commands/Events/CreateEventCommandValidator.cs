using FluentValidation;
using FluentValidation.Results;
using SysTicket.Application.Commands.Events;
using SysTicket.Common.Extensions;
using SysTicket.Domain.Interfaces.Repositories;

namespace SysTicket.Application.Handlers.Commands.Events
{
    internal class CreateEventCommandValidator : AbstractValidator<CreateEventCommand>
    {
        private readonly IUsersRepository _usersRepository;

        public CreateEventCommandValidator(IUsersRepository usersRepository)
        {
            _usersRepository = usersRepository;

            RuleFor(x => x.Title)
                .NotEmpty()
                .Length(3, 128);

            RuleFor(x => x.Body)
                .NotEmpty();

            RuleFor(x => x.DateFrom)
                .LessThanOrEqualTo(command => command.DateTo)
                .WithMessage("Rozpoczęcie wydarzenia nie może być późniejsze niż zakończenie wydarzenia");

            RuleFor(x => x.LogoBase64)
                .NotEmpty()
                .WithMessage("Wydarzenie musi posiadać logo");

            RuleFor(x => x.UserId).IsId();
        }

        public override async Task<ValidationResult> ValidateAsync(ValidationContext<CreateEventCommand> context, CancellationToken cancellationToken = default)
        {
            await CheckUserExists(context);

            return await base.ValidateAsync(context, cancellationToken);
        }

        private async Task CheckUserExists(ValidationContext<CreateEventCommand> context)
        {
            if (!await _usersRepository.IsUserExistById(context.InstanceToValidate.UserId))
            {
                context.AddFailure("Użytkownik nie istnieje.");
            }
        }
    }
}