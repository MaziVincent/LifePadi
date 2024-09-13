using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.DTO;
using Api.Services;

namespace Api.Interfaces
{
    public interface IWalletNotification
    {
        public Task<WalletNotificationDto> createAsync(WalletNotificationDto walletNotificationDto);
        public Task<PagedList<WalletNotificationDto>> getAllAsync(SearchPaging props);
        public Task<WalletNotificationDto> getAsync(int id);
        public Task<WalletNotificationDto> updateAsync(int id, WalletNotificationDto walletNotificationDto);
        public Task<string> deleteAsync(int id);
        public Task<List<WalletNotificationDto>> getByWalletId(int walletId);
        public Task<List<WalletNotificationDto>> getByCustomerId(int customerId);
        public Task<List<WalletNotificationDto>> getByStatus(string status);
        public Task<List<WalletNotificationDto>> getByType(string type);
        public Task<List<WalletNotificationDto>> getByDate(DateTime date);
        public Task<List<WalletNotificationDto>> getByDateRange(DateTime startDate, DateTime endDate);
        public Task<List<WalletNotificationDto>> getByDateRangeForWallet(int walletId, DateTime startDate, DateTime endDate);
        public Task<List<WalletNotificationDto>> getByReadStatusForWallet(int walletId, bool isRead);
        public Task<string> markAsRead(int id);

    }
}