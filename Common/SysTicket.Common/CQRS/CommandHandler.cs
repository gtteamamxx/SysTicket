using MediatR;

namespace SysTicket.Common.CQRS
{
    public abstract class CommandHandler<T> : IRequestHandler<T> where T : IRequest
    {
        public abstract Task Handle(T request, CancellationToken cancellationToken);

        async Task<Unit> IRequestHandler<T, Unit>.Handle(T request, CancellationToken cancellationToken)
        {
            await Handle(request, cancellationToken);

            return Unit.Value;
        }
    }
}