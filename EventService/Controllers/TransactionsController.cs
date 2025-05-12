using Microsoft.AspNetCore.Mvc;
using EventService.Data;
using EventService.DTOs;
using EventService.Models;
using AutoMapper;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;

namespace EventService.Controllers
{
    [Route("api/events/{eventId}/[controller]")]
    [ApiController]
    public class TransactionsController : ControllerBase
    {
        private readonly IEventRepository _eventRepository;
        private readonly ITransactionRepository _transactionRepository;
        private readonly IMapper _mapper;

        public TransactionsController(
            IEventRepository eventRepository,
            ITransactionRepository transactionRepository,
            IMapper mapper)
        {
            _eventRepository = eventRepository;
            _transactionRepository = transactionRepository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TransactionDto>>> GetTransactions(int eventId)
        {
            if (await _eventRepository.GetEventByIdAsync(eventId) == null)
            {
                return NotFound();
            }

            var transactions = await _transactionRepository.GetTransactionsByEventIdAsync(eventId);
            return Ok(_mapper.Map<IEnumerable<TransactionDto>>(transactions));
        }

        [HttpGet("{id}", Name = "GetTransactionById")]
        public async Task<ActionResult<TransactionDto>> GetTransaction(int eventId, int id)
        {
            if (await _eventRepository.GetEventByIdAsync(eventId) == null)
            {
                return NotFound("Event not found");
            }

            var transaction = await _transactionRepository.GetTransactionByIdAsync(id);
            if (transaction == null || transaction.EventId != eventId)
            {
                return NotFound("Transaction not found");
            }

            return Ok(_mapper.Map<TransactionDto>(transaction));
        }

        [HttpPost]
        public async Task<ActionResult<TransactionDto>> CreateTransaction(
            int eventId, CreateTransactionDto createTransactionDto)
        {
            var eventItem = await _eventRepository.GetEventByIdAsync(eventId);
            if (eventItem == null)
            {
                return NotFound("Event not found");
            }

            var transaction = _mapper.Map<Transaction>(createTransactionDto);
            transaction.EventId = eventId;
            transaction.TransactionDate = DateTime.UtcNow;

            await _transactionRepository.CreateTransactionAsync(transaction);

            var transactionDto = _mapper.Map<TransactionDto>(transaction);
            return CreatedAtRoute(
                nameof(GetTransaction),
                new { eventId, id = transaction.Id },
                transactionDto);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateTransaction(
            int eventId, int id, CreateTransactionDto updateTransactionDto)
        {
            var eventItem = await _eventRepository.GetEventByIdAsync(eventId);
            if (eventItem == null)
            {
                return NotFound("Event not found");
            }


            var transaction = await _transactionRepository.GetTransactionByIdAsync(id);
            if (transaction == null || transaction.EventId != eventId)
            {
                return NotFound("Transaction not found");
            }

            _mapper.Map(updateTransactionDto, transaction);
            transaction.UpdatedAt = DateTime.UtcNow;

            await _transactionRepository.UpdateTransactionAsync(transaction);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteTransaction(int eventId, int id)
        {
            var eventItem = await _eventRepository.GetEventByIdAsync(eventId);
            if (eventItem == null)
            {
                return NotFound("Event not found");
            }

            var transaction = await _transactionRepository.GetTransactionByIdAsync(id);
            if (transaction == null || transaction.EventId != eventId)
            {
                return NotFound("Transaction not found");
            }

            await _transactionRepository.DeleteTransactionAsync(id);
            return NoContent();
        }
    }
}
