using FluentValidation;
using FluentValidation.Results;
using HtmlAgilityPack;
using SysTicket.Application.Commands.Events;
using SysTicket.Common.Extensions;
using SysTicket.Domain.Entities;
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
            string layout = context.InstanceToValidate.Layout;
            RegionPrices regionPrices = context.InstanceToValidate.RegionPrices;

            var layoutHtml = new HtmlDocument();

            try
            {
                layoutHtml.LoadHtml(layout);
            }
            catch
            {
                context.AddFailure("Układ hali nie jest poprawny");
                return;
            }

            if (layoutHtml.ParseErrors.Any())
            {
                context.AddFailure(layoutHtml.ParseErrors.First().Reason);
                return;
            }

            HtmlNodeCollection allChairs = layoutHtml.DocumentNode.SelectNodes("//*[contains(@class, 'chair')]");
            if (allChairs == null)
            {
                context.AddFailure("Hala nie posiada krzeseł");
                return;
            }

            List<string> regions = allChairs.Select(x => x.Id.Split(".")[0])
                .Distinct()
                .ToList();

            if (regions.Any(region => !regionPrices.ContainsKey(region)))
            {
                context.AddFailure("Nie wszystkie rzędy/krzesła posiadają swoją cenę.");
            }
        }
    }
}