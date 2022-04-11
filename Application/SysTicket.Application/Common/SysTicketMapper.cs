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
            _mapper = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<User, UserDTO>();
            }).CreateMapper();
        }

        public T Map<T>(object? entity) => _mapper.Map<T>(entity);
    }
}
