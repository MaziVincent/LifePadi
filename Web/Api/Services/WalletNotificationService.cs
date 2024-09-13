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
    public class WalletNotificationService : IWalletNotification
    {
        private readonly DBContext _context;
        private readonly IMapper _mapper;
        public WalletNotificationService(DBContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<WalletNotificationDto> createAsync(WalletNotificationDto walletNotificationDto)
        {
            try
            {
                var walletNotification = _mapper.Map<WalletNotification>(walletNotificationDto);
                await _context.WalletNotifications.AddAsync(walletNotification);
                await _context.SaveChangesAsync();
                return _mapper.Map<WalletNotificationDto>(walletNotification);
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
                var walletNotification = await _context.WalletNotifications.FirstOrDefaultAsync(x => x.Id == id);
                if (walletNotification == null) throw new Exceptions.ServiceException("WalletNotification not found");
                _context.WalletNotifications.Remove(walletNotification);
                await _context.SaveChangesAsync();
                return "WalletNotification deleted successfully";
            }
            catch (Exception e)
            {
                throw new Exceptions.ServiceException(e.Message);
            }
        }

        public Task<PagedList<WalletNotificationDto>> getAllAsync(SearchPaging props)
        {
            throw new NotImplementedException();
        }

        public async Task<WalletNotificationDto> getAsync(int id)
        {
            try
            {
                var walletNotification = await _context.WalletNotifications.FirstOrDefaultAsync(x => x.Id == id);
                if (walletNotification == null) throw new Exceptions.ServiceException("WalletNotification not found");
                return _mapper.Map<WalletNotificationDto>(walletNotification);
            }
            catch (Exception e)
            {
                throw new Exceptions.ServiceException(e.Message);
            }
        }

        public async Task<List<WalletNotificationDto>> getByCustomerId(int customerId)
        {
            try
            {
                var walletNotifications = await _context.WalletNotifications.Where(x => x.Wallet!.CustomerId== customerId)
                .Include(x => x.Wallet)
                .Include(x => x.Wallet!.Customer)
                .OrderByDescending(x => x.CreatedAt)
                .ToListAsync();
                return _mapper.Map<List<WalletNotificationDto>>(walletNotifications);
            }
            catch (Exception e)
            {
                throw new Exceptions.ServiceException(e.Message);
            }
        }

        public async Task<List<WalletNotificationDto>> getByDate(DateTime date)
        {
            try
            {
                var walletNotifications = await _context.WalletNotifications.Where(x => x.CreatedAt!.Value.Date == date.Date)
                .Include(x => x.Wallet)
                .Include(x => x.Wallet!.Customer)
                .OrderByDescending(x => x.CreatedAt)
                .ToListAsync();
                return _mapper.Map<List<WalletNotificationDto>>(walletNotifications);
            }
            catch (Exception e)
            {
                throw new Exceptions.ServiceException(e.Message);
            }
        }

        public async Task<List<WalletNotificationDto>> getByDateRange(DateTime startDate, DateTime endDate)
        {
            try
            {
                var walletNotifications = await _context.WalletNotifications.Where(x => x.CreatedAt!.Value.Date >= startDate.Date && x.CreatedAt!.Value.Date <= endDate.Date)
                .Include(x => x.Wallet)
                .Include(x => x.Wallet!.Customer)
                .OrderByDescending(x => x.CreatedAt)
                .ToListAsync();
                return _mapper.Map<List<WalletNotificationDto>>(walletNotifications);
            }
            catch (Exception e)
            {
                throw new Exceptions.ServiceException(e.Message);
            }
        }

        public async Task<List<WalletNotificationDto>> getByDateRangeForWallet(int walletId, DateTime startDate, DateTime endDate)
        {
            try
            {
                var walletNotifications = await _context.WalletNotifications.Where(x => x.WalletId == walletId && x.CreatedAt!.Value.Date >= startDate.Date && x.CreatedAt!.Value.Date <= endDate.Date)
                .Include(x => x.Wallet)
                .Include(x => x.Wallet!.Customer)
                .OrderByDescending(x => x.CreatedAt)
                .ToListAsync();
                return _mapper.Map<List<WalletNotificationDto>>(walletNotifications);
            }
            catch (Exception e)
            {
                throw new Exceptions.ServiceException(e.Message);
            }
        }

        public async Task<List<WalletNotificationDto>> getByReadStatusForWallet(int walletId, bool isRead)
        {
            try
            {
                var walletNotifications = await _context.WalletNotifications.Where(x => x.WalletId == walletId && x.IsRead == isRead)
                .Include(x => x.Wallet)
                .Include(x => x.Wallet!.Customer)
                .OrderByDescending(x => x.CreatedAt)
                .ToListAsync();
                return _mapper.Map<List<WalletNotificationDto>>(walletNotifications);
            }
            catch (Exception e)
            {
                throw new Exceptions.ServiceException(e.Message);
            }
        }

        public Task<List<WalletNotificationDto>> getByStatus(string status)
        {
            throw new NotImplementedException();
        }

        public async Task<List<WalletNotificationDto>> getByType(string type)
        {
            try
            {
                var walletNotifications = await _context.WalletNotifications.Where(x => x.Type == type)
                .Include(x => x.Wallet)
                .Include(x => x.Wallet!.Customer)
                .OrderByDescending(x => x.CreatedAt)
                .ToListAsync();
                return _mapper.Map<List<WalletNotificationDto>>(walletNotifications);
            }
            catch (Exception e)
            {
                throw new Exceptions.ServiceException(e.Message);
            }
        }

        public async Task<List<WalletNotificationDto>> getByWalletId(int walletId)
        {
            try
            {
                var walletNotifications = await _context.WalletNotifications.Where(x => x.WalletId == walletId)
                .Include(x => x.Wallet)
                .Include(x => x.Wallet!.Customer)
                .OrderByDescending(x => x.CreatedAt)
                .ToListAsync();
                return _mapper.Map<List<WalletNotificationDto>>(walletNotifications);
            }
            catch (Exception e)
            {
                throw new Exceptions.ServiceException(e.Message);
            }
        }

        public Task<WalletNotificationDto> updateAsync(int id, WalletNotificationDto walletNotificationDto)
        {
            throw new NotImplementedException();
        }

        public async Task<string> markAsRead(int id)
        {
            try
            {
                var walletNotification = await _context.WalletNotifications.FirstOrDefaultAsync(x => x.Id == id);
                if (walletNotification == null) throw new Exceptions.ServiceException("WalletNotification not found");
                walletNotification.IsRead = true;
                walletNotification.UpdatedAt = DateTime.UtcNow;
                await _context.SaveChangesAsync();
                return "WalletNotification marked as read";
            }
            catch (Exception e)
            {
                throw new Exceptions.ServiceException(e.Message);
            }
        }
    }
}
