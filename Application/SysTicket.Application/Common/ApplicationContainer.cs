using AdaskoTheBeAsT.MediatR.SimpleInjector;
using AdaskoTheBeAsT.FluentValidation.SimpleInjector;

using SimpleInjector;
using SimpleInjector.Packaging;
using SysTicket.Application.Interfaces.Common;
using SysTicket.Application.Pipelines;

namespace SysTicket.Application.Common
{
    public class ApplicationContainer : IPackage
    {
        public void RegisterServices(Container container)
        {
            container.AddMediatR(cfg =>
            {
                cfg.WithAssembliesToScan(GetType().Assembly);
                cfg.UsingPipelineProcessorBehaviors(typeof(ValidationPipeline<,>));
            });

            container.AddFluentValidation(cfg =>
            {
                cfg.WithAssembliesToScan(GetType().Assembly);
                cfg.RegisterAsValidatorCollection();
            });

            container.Register<ISysTicketMapper, SysTicketMapper>(Lifestyle.Singleton);
        }
    }
}
