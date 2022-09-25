using SysTicket.Application.Interfaces.Common;
using SysTicket.Domain.Interfaces.Common;

namespace SysTicket.Application.Common
{
    internal class EntityId : IEntityId
    {
        private readonly IId _entity;

        public EntityId(IId entity) => _entity = entity;

        public int GetId() => _entity.Id;
    }
}