using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.DTO;
using Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Api.Interfaces
{
    public interface IVoucherNotification
    {
        public Task<VoucherNotificationDto> Create(VoucherNotificationDto voucherNotificationDto);
        public Task<List<VoucherNotificationDto>> AllAsync();
        public Task<VoucherNotificationDto> GetAsync(int id);
        public Task<VoucherNotificationDto> UpdateAsync(int id, VoucherNotificationDto voucherNotificationDto);
        public Task<string> DeleteAsync(int id);
        public Task<List<VoucherNotificationDto>> GetByCustomerId(int customerId);
        public Task<List<VoucherNotificationDto>> GetByVoucherId(int voucherId);
        public Task<VoucherNotificationDto> GetByCustomerIdAndVoucherId(int customerId, int voucherId);
        public Task<List<VoucherNotificationDto>> GetByCustomerIdAndIsRead(int customerId, bool isRead);
    }
}
