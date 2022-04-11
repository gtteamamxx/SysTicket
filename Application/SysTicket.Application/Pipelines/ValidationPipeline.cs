﻿using FluentValidation;
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

        public Task<TResponse> Handle(TRequest request, CancellationToken cancellationToken, RequestHandlerDelegate<TResponse> next)
        {
            if (!_validators.Any()) return next();
            
            var context = new ValidationContext<TRequest>(request);

            IEnumerable<ValidationFailure>? errors = _validators
                .Select(x => x.Validate(context))
                .SelectMany(x => x.Errors)
                .Where(x => x != null)
                .ToList();
            
            if (errors.Any()) throw new ValidationException(errors);

            return next();
        }
    }
}
