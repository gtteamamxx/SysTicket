using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Features;
using System.Security.Claims;

namespace SysTicket.API.UnitTests.Models
{
    internal class HttpContextTestModel : HttpContext
    {
        public override ConnectionInfo Connection => throw new NotImplementedException();

        public override IFeatureCollection Features => throw new NotImplementedException();

        public override IDictionary<object, object?> Items { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }

        public override HttpRequest Request => throw new NotImplementedException();

        public override CancellationToken RequestAborted { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }

        public override IServiceProvider RequestServices { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }

        public override HttpResponse Response { get; } = new HttpResponseTestModel();

        public override ISession Session { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }

        public override string TraceIdentifier { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }

        public override ClaimsPrincipal User { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }

        public override WebSocketManager WebSockets => throw new NotImplementedException();

        public override void Abort()
        {
            throw new NotImplementedException();
        }
    }
}