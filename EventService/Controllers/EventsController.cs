using Microsoft.AspNetCore.Mvc;
using EventService.Data;
using EventService.DTOs;
using EventService.Models;
using AutoMapper;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EventService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventsController : ControllerBase
    {
        private readonly IEventRepository _eventRepository;
        private readonly ITransactionRepository _transactionRepository;
        private readonly IMapper _mapper;

        public EventsController(
            IEventRepository eventRepository, 
            ITransactionRepository transactionRepository,
            IMapper mapper)
        {
            _eventRepository = eventRepository;
            _transactionRepository = transactionRepository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<EventDto>>> GetEvents()
        {
            var events = await _eventRepository.GetAllEventsAsync();
            var eventDtos = new List<EventDto>();

            foreach (var eventItem in events)
            {
                var eventDto = _mapper.Map<EventDto>(eventItem);
                eventDto.TotalIncome = await _transactionRepository.GetTotalIncomeAsync(eventItem.Id);
                eventDto.TotalExpenses = await _transactionRepository.GetTotalExpensesAsync(eventItem.Id);
                eventDtos.Add(eventDto);
            }

            return Ok(eventDtos);
        }

        [HttpGet("{id}", Name = "GetEventById")]
        public async Task<ActionResult<EventDto>> GetEventById(int id)
        {
            var eventItem = await _eventRepository.GetEventByIdAsync(id);
            if (eventItem == null)
            {
                return NotFound();
            }

            var eventDto = _mapper.Map<EventDto>(eventItem);
            eventDto.TotalIncome = await _transactionRepository.GetTotalIncomeAsync(id);
            eventDto.TotalExpenses = await _transactionRepository.GetTotalExpensesAsync(id);

            return Ok(eventDto);
        }

        [HttpPost]
        public async Task<ActionResult<EventDto>> CreateEvent(CreateEventDto createEventDto)
        {
            var eventItem = _mapper.Map<Event>(createEventDto);
            await _eventRepository.CreateEventAsync(eventItem);

            var eventDto = _mapper.Map<EventDto>(eventItem);
            return CreatedAtRoute(nameof(GetEventById), new { id = eventDto.Id }, eventDto);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateEvent(int id, CreateEventDto updateEventDto)
        {
            var eventItem = await _eventRepository.GetEventByIdAsync(id);
            if (eventItem == null)
            {
                return NotFound();
            }

            _mapper.Map(updateEventDto, eventItem);
            await _eventRepository.UpdateEventAsync(eventItem);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteEvent(int id)
        {
            var eventItem = await _eventRepository.GetEventByIdAsync(id);
            if (eventItem == null)
            {
                return NotFound();
            }

            await _eventRepository.DeleteEventAsync(id);
            return NoContent();
        }
    }
}
