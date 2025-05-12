using AutoMapper;
using EventService.DTOs;
using EventService.Models;

namespace EventService.Profiles
{
    public class EventProfiles : Profile
    {
        public EventProfiles()
        {
            // Source -> Target
            CreateMap<Event, EventDto>();
            CreateMap<CreateEventDto, Event>();
            
            CreateMap<Transaction, TransactionDto>();
            CreateMap<CreateTransactionDto, Transaction>()
                .ForMember(dest => dest.TransactionDate, opt => opt.Ignore())
                .ForMember(dest => dest.CreatedAt, opt => opt.Ignore())
                .ForMember(dest => dest.UpdatedAt, opt => opt.Ignore())
                .ForMember(dest => dest.Event, opt => opt.Ignore());
        }
    }
}
