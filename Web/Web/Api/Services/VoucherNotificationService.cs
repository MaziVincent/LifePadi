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
    public class VoucherNotificationService : IVoucherNotification
    {
        private readonly DBContext _context;
        private readonly IMapper _mapper;
        readonly string message = "VoucherNotification not found";
        public VoucherNotificationService(DBContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<List<VoucherNotificationDto>> AllAsync()
        {
            try
            {
                var voucherNotifications = await _context.VoucherNotifications
                .Include(vn => vn.Customer)
                .Include(vn => vn.Voucher)
                .ToListAsync();
                return _mapper.Map<List<VoucherNotificationDto>>(voucherNotifications);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<VoucherNotificationDto> Create(VoucherNotificationDto voucherNotificationDto)
        {
            try
            {
                var voucherNotification = _mapper.Map<VoucherNotification>(voucherNotificationDto);
                await _context.VoucherNotifications.AddAsync(voucherNotification);
                await _context.SaveChangesAsync();
                return _mapper.Map<VoucherNotificationDto>(voucherNotification);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<string> DeleteAsync(int id)
        {
            try
            {
                var voucherNotification = await _context.VoucherNotifications.FirstOrDefaultAsync(vn => vn.Id == id);
                if (voucherNotification == null) throw new Exception(message);
                _context.VoucherNotifications.Remove(voucherNotification);
                await _context.SaveChangesAsync();
                return "Deleted Successfully";
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<VoucherNotificationDto> GetAsync(int id)
        {
            try
            {
                var voucherNotification = await _context.VoucherNotifications
                .Include(vn => vn.Customer)
                .Include(vn => vn.Voucher)
                .FirstOrDefaultAsync(vn => vn.Id == id) ?? throw new Exception(message);
                return _mapper.Map<VoucherNotificationDto>(voucherNotification);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<List<VoucherNotificationDto>> GetByCustomerId(int customerId)
        {
            try
            {
                var voucherNotifications = await _context.VoucherNotifications
                .Include(vn => vn.Customer)
                .Include(vn => vn.Voucher)
                .Where(vn => vn.CustomerId == customerId)
                .ToListAsync();
                return _mapper.Map<List<VoucherNotificationDto>>(voucherNotifications);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<List<VoucherNotificationDto>> GetByCustomerIdAndIsRead(int customerId, bool isRead)
        {
            try
            {
                var voucherNotifications = await _context.VoucherNotifications
                .Include(vn => vn.Customer)
                .Include(vn => vn.Voucher)
                .Where(vn => vn.CustomerId == customerId && vn.IsRead == isRead)
                .ToListAsync();
                return _mapper.Map<List<VoucherNotificationDto>>(voucherNotifications);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<VoucherNotificationDto> GetByCustomerIdAndVoucherId(int customerId, int voucherId)
        {
            try
            {
                var voucherNotification = await _context.VoucherNotifications
                .Include(vn => vn.Customer)
                .Include(vn => vn.Voucher)
                .FirstOrDefaultAsync(vn => vn.CustomerId == customerId && vn.VoucherId == voucherId) ?? throw new Exception(message);
                return _mapper.Map<VoucherNotificationDto>(voucherNotification);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<List<VoucherNotificationDto>> GetByVoucherId(int voucherId)
        {
            try
            {
                var voucherNotifications = await _context.VoucherNotifications
                .Include(vn => vn.Customer)
                .Include(vn => vn.Voucher)
                .Where(vn => vn.VoucherId == voucherId)
                .ToListAsync();
                return _mapper.Map<List<VoucherNotificationDto>>(voucherNotifications);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<VoucherNotificationDto> UpdateAsync(int id, VoucherNotificationDto voucherNotificationDto)
        {
            try
            {
                var voucherNotification = await _context.VoucherNotifications.FirstOrDefaultAsync(vn => vn.Id == id) ?? throw new Exception(message);
                voucherNotification.IsRead = voucherNotificationDto.IsRead;
                voucherNotification.UpdatedAt = DateTime.UtcNow;
                await _context.SaveChangesAsync();
                return _mapper.Map<VoucherNotificationDto>(voucherNotification);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}