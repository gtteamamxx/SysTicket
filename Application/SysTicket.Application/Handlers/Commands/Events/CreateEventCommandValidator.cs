using FluentValidation;
using FluentValidation.Results;
using SysTicket.Application.Commands.Events;
using SysTicket.Common.Extensions;
using SysTicket.Domain.Interfaces.Helpers;
using SysTicket.Domain.Interfaces.Repositories;

namespace SysTicket.Application.Handlers.Commands.Events
{
    internal class CreateEventCommandValidator : AbstractValidator<CreateEventCommand>
    {
        private readonly ILayoutService _layoutService;
        private readonly IUsersRepository _usersRepository;

        public CreateEventCommandValidator(
            ILayoutService layoutService,
            IUsersRepository usersRepository)
        {
            _layoutService = layoutService;
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

            RuleFor(x => x.Layout)
                .NotEmpty()
                .WithMessage("Wydarzenie musi posiadać układ hali");

            RuleFor(x => x.RegionPrices)
                .NotEmpty();
        }

        public override async Task<ValidationResult> ValidateAsync(ValidationContext<CreateEventCommand> context, CancellationToken cancellationToken = default)
        {
            ValidateLayout(context);

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

        private void ValidateLayout(ValidationContext<CreateEventCommand> context)
        {
            _layoutService.ValidateLayout(
                layout: context.InstanceToValidate.Layout,
                regionPrices: context.InstanceToValidate.RegionPrices,
                out string? error
            );

            if (error != null)
            {
                context.AddFailure(error);
            }
        }
    }
}