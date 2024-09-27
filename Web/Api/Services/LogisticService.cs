using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.DTO;
using Api.Interfaces;
using Api.Models;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace Api.Services
{
    public class LogisticService : ILogistic
    {
        private readonly DBContext _context;
        private readonly IMapper _mapper;

        public LogisticService(DBContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<LogisticDto> createAsync(LogisticDto logisticDto)
        {
            try
            {
                var logistic = _mapper.Map<Logistic>(logisticDto);
                logistic.TrackingNumber = Guid.NewGuid().ToString();
                logistic.Status = "Ongoing";
                await _context.Logistics.AddAsync(logistic);
                await _context.SaveChangesAsync();
                return _mapper.Map<LogisticDto>(logistic);
            }
            catch (Exception e)
            {
                throw new Exceptions.ServiceException(e.Message);
            }
        }

        public async Task<IEnumerable<LogisticDto>> getAll()
        {
            try
            {
                var logistics = await _context.Logistics.OrderByDescending(l => l.CreatedAt).ToListAsync();
                return _mapper.Map<IEnumerable<LogisticDto>>(logistics);
            }
            catch (Exception e)
            {
                throw new Exceptions.ServiceException(e.Message);
            }
        }

        public async Task<LogisticDto> getAsync(int id)
        {
            try
            {
                var logistic = await _context.Logistics.FirstOrDefaultAsync(l => l.Id == id);
                if (logistic == null)
                {
                    throw new Exceptions.ServiceException("Logistic not found");
                }
                return _mapper.Map<LogisticDto>(logistic);
            }
            catch (Exception e)
            {
                throw new Exceptions.ServiceException(e.Message);
            }
        }

        public async Task<PagedList<Logistic>> allAsync(SearchPaging props)
        {
            try
            {
                IQueryable<Logistic> logisticList = Enumerable.Empty<Logistic>().AsQueryable();
                if (props.SearchString == null)
                {
                    var normalLogistics = await _context.Logistics.OrderByDescending(l => l.CreatedAt)
                    .Include(l => l.Order)
                    .ThenInclude(o => o!.Customer)
                    .ToListAsync();
                    logisticList = logisticList.Concat(normalLogistics);
                    var returnList = PagedList<Logistic>.ToPagedList(logisticList, props.PageNumber, props.PageSize);
                    return returnList;
                }
                    
                var searchLogistics = await _context.Logistics.OrderByDescending(l => l.CreatedAt)
                    .Include(l => l.Order)
                    .ThenInclude(o => o!.Customer)
                    .Where(l => l.Item!.Contains(props.SearchString))
                    .ToListAsync();
                logisticList = logisticList.Concat(searchLogistics);
                var returnList2 = PagedList<Logistic>.ToPagedList(logisticList, props.PageNumber, props.PageSize);
                return returnList2;
            }
            catch (Exception e)
            {
                throw new Exceptions.ServiceException(e.Message);
            }
        }

        public async Task<string> deleteAsync(int id)
        {
            try
            {
                var logistic = await _context.Logistics.FirstOrDefaultAsync(l => l.Id == id);
                if (logistic == null)
                {
                    throw new Exceptions.ServiceException("Logistic not found");
                }
                _context.Logistics.Remove(logistic);
                await _context.SaveChangesAsync();
                return "Logistic deleted successfully";
            }
            catch (Exception e)
            {
                throw new Exceptions.ServiceException(e.Message);
            }
        }
    }
}