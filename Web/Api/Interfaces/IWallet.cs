using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.DTO;
using Api.Models;
using Api.Services;

namespace Api.Interfaces
{
    public interface IWallet
    {
        public Task<WalletDto> createAsync(WalletDto walletDto);
        public Task<WalletDto> getAsync(int id);
        public Task<List<WalletDto>> getAllAsync();
        public Task<WalletDto> updateAsync(int id, WalletDto walletDto);
        public Task<string> deleteAsync(int id);
        public Task<double> getBalance(int id);
        public Task<double> getInitialBalance(int id);
        public Task<WalletDto> getWalletByCustomerId(int customerId);
        public Task<object> getCustomerWalletStat(int customerId);
<<<<<<< HEAD
<<<<<<< HEAD
        public Task<PagedList<Transaction>> GetTransactionsAsync(int walletId, SearchPaging props);
=======
>>>>>>> 568d50b (done with chat messages)
=======
        public Task<PagedList<Transaction>> GetTransactionsAsync(int walletId, SearchPaging props);
>>>>>>> 8ad4440 (wallet and transaction commits)
        public Task<List<DepositeDto>> lastFiveTransactions(int walletId);
    }
}
