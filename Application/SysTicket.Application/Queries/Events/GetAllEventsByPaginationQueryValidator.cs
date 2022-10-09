using FluentValidation;

namespace SysTicket.Application.Queries.Events
{
    public class GetAllEventsByPaginationQueryValidator : AbstractValidator<GetAllEventsByPaginationQuery>
    {
        public GetAllEventsByPaginationQueryValidator()
        {
            RuleFor(x => x.PageSize)
                .GreaterThanOrEqualTo(1)
                .LessThanOrEqualTo(20)
                .WithMessage("Liczba elementów na stronę musi wynosić od 1 do 20 elementów");

            RuleFor(x => x.PageIndex)
                .GreaterThanOrEqualTo(0);
        }
    }
}