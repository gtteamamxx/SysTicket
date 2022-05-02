using FluentValidation;
using FluentValidation.Results;
using MediatR;

namespace SysTicket.Application.Pipelines
{
    public class ValidationPipeline<TRequest, TResponse> : IPipelineBehavior<TRequest, TResponse>
        where TRequest : class, IRequest<TResponse>
    {
        private readonly IEnumerable<IValidator<TRequest>> _validators;

        public ValidationPipeline(IEnumerable<IValidator<TRequest>> validators)
            => _validators = validators;

        public async Task<TResponse> Handle(TRequest request, CancellationToken cancellationToken, RequestHandlerDelegate<TResponse> next)
        {
            if (!_validators.Any()) return await next();

            var context = new ValidationContext<TRequest>(request);

            List<ValidationFailure> errors = new();

            foreach (IValidator<TRequest>? validator in _validators)
            {
                ValidationResult? validationResult = await validator.ValidateAsync(context);

                List<ValidationFailure>? validationErrors = validationResult?.Errors;

                if (validationErrors?.Any() == true)
                    errors.AddRange(validationErrors);
            }

            if (errors.Any()) throw new ValidationException(errors);

            return await next();
        }
    }
}