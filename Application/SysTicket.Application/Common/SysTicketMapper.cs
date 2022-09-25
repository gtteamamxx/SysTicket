using AutoMapper;
using SysTicket.Application.DTO.Users;
using SysTicket.Application.Interfaces.Common;
using SysTicket.Domain.Entities;

namespace SysTicket.Application.Common
{
    public class SysTicketMapper : ISysTicketMapper
    {
        private readonly IMapper _mapper;

        public SysTicketMapper()
        {
            var conf = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<User, UserDTO>();
            });

            conf.AssertConfigurationIsValid();

            _mapper = conf.CreateMapper();
        }

        public T Map<T>(object? entity) => _mapper.Map<T>(entity);
    }
}