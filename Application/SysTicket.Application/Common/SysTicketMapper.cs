using AutoMapper;
using SysTicket.Application.DTO.Events;
using SysTicket.Application.DTO.Users;
using SysTicket.Application.Interfaces.Common;
using SysTicket.Domain.Entities;
using static SysTicket.Application.DTO.Events.EventDetailsDTO;

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

                cfg.CreateMap<Event, EventDTO>()
                    .ForMember(x => x.CreationUserName, x => x.MapFrom(y => y.User.Name))
                    .ForMember(x => x.HeaderImgBase64, x => x.MapFrom(y => y.LogoBase64));

                cfg.CreateMap<Event, EventDetailsDTO>()
                    .ForMember(x => x.CreationUserName, x => x.MapFrom(y => y.User.Name))
                    .ForMember(x => x.HeaderImgBase64, x => x.MapFrom(y => y.LogoBase64))
                    .ForMember(x => x.RegionPrices, x => x.MapFrom(y => y.EventPrices))
                    .ForMember(x => x.NumberOfSeats, x => x.Ignore())
                    .ForMember(x => x.Seats, x => x.MapFrom(y => y.EventSeats));

                cfg.CreateMap<EventPrice, EventDetailsPrice>();

                cfg.CreateMap<EventSeat, EventDetailsSeat>();
            });

            conf.AssertConfigurationIsValid();

            _mapper = conf.CreateMapper();
        }

        public T Map<T>(object? entity) => _mapper.Map<T>(entity);
    }
}