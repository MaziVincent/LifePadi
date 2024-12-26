using System;
using System.Collections.Generic;
using System.Linq;
using System.Numerics;
using System.Threading.Tasks;
using Api.DTO;
using Api.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class WalletController : ControllerBase
    {
        private readonly IWallet _wallet;
        private readonly IMapper _mapper;

        public WalletController(IWallet wallet, IMapper mapper)
        {
            _wallet = wallet;
<<<<<<< HEAD
            _mapper = mapper;
        }
//wallet controller
=======
            _walletDeposite = walletDeposite;
            _walletWithdrawal = walletWithdrawal;
        }

        [HttpPost("deposit/{id}")]
        public async Task<IActionResult> deposite(int id, [FromBody] double amount)
        {
            try
            {
                var response = await _wallet.depositAsync(id, amount);
                return Ok(response);
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("withdraw/{id}")]
        public async Task<IActionResult> withdraw(int id, [FromBody] double amount)
        {
            try
            {
                var response = await _wallet.withdrawAsync(id, amount);
                return Ok(response);
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
>>>>>>> 0ca0962 (notification, location and other commits)

        [HttpGet("balance/{id}")]
        public async Task<IActionResult> balance(int id)
        {
            try
            {
                var response = await _wallet.getBalance(id);
                return Ok(response);
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("all")]
        public async Task<IActionResult> all()
        {
            try
            {
                var wallets = await _wallet.getAllAsync();
                return Ok(wallets);
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("get/{id}")]
        public async Task<IActionResult> get(int id)
        {
            try
            {
                var wallet = await _wallet.getAsync(id);
                return Ok(wallet);
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("stats/{id}")]
        public async Task<IActionResult> walletstats(int id)
        {
            try
            {
                var stats = await _wallet.getCustomerWalletStat(id);
                return Ok(stats);
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("initial-balance/{id}")]
        public async Task<IActionResult> getInitialBalance(int id)
        {
            try
            {
                var balance = await _wallet.getInitialBalance(id);
                return Ok(balance);
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("customer/{customerId}")]
        public async Task<IActionResult> getCustomerWallet(int customerId)
        {
            try
            {
                var wallet = await _wallet.getWalletByCustomerId(customerId);
                return Ok(wallet);
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        

        [HttpPost("create")]
        public async Task<IActionResult> create([FromBody] WalletDto wallet)
        {
            try
            {
                var response = await _wallet.createAsync(wallet);
                return Ok(response);
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("update/{id}")]
        public async Task<IActionResult> update(int id, [FromBody] WalletDto wallet)
        {
            try
            {
                var response = await _wallet.updateAsync(id, wallet);
                return Ok(response);
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> delete(int id)
        {
            try
            {
                var response = await _wallet.deleteAsync(id);
                return Ok(response);
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 568d50b (done with chat messages)
        [HttpGet("last-five-transactions/{walletId}")]
        public async Task<IActionResult> getLastFiveTransactions(int walletId)
        {
            try
            {
                var transactions = await _wallet.lastFiveTransactions(walletId);
                return Ok(transactions);
<<<<<<< HEAD
=======
        [HttpGet("deposites/{walletId}")]
        public async Task<IActionResult> getDeposites(int walletId, SearchPaging props)
        {
            try
            {
                var response = await _walletDeposite.getByWalletId(walletId, props);
                return Ok(response);
>>>>>>> 0ca0962 (notification, location and other commits)
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 8ad4440 (wallet and transaction commits)
        [HttpGet("transactions/{id}")]
        public async Task<IActionResult> getTransactions(int id, [FromQuery] SearchPaging props)
        {
            try
            {
                var response = await _wallet.GetTransactionsAsync(id, props);
                var result = _mapper.Map<List<TransactionDto>>(response);
                var dataList = new
                {
                    response.PageSize,
                    response.TotalPages,
                    response.TotalCount,
                    response.CurrentPage,
                    response.HasNext
                };
                return Ok(new { result, dataList });
            }
            catch (Exception ex)
=======

        [HttpGet("withdrawals/{walletId}")]
        public async Task<IActionResult> getWithdrawals(int walletId, SearchPaging props)
        {
            try
            {
                var response = await _walletWithdrawal.getByWalletId(walletId, props);
                return Ok(response);
            }catch(Exception ex)
>>>>>>> 0ca0962 (notification, location and other commits)
            {
                return BadRequest(ex.Message);
            }
        }

<<<<<<< HEAD
=======
        [HttpGet("customer-deposites/{customerId}")]
        public async Task<IActionResult> getCustomerDeposites(int customerId)
        {
            try
            {
                var response = await _walletDeposite.getByCustomerId(customerId);
                return Ok(response);
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("customer-withdrawals/{customerId}")]
        public async Task<IActionResult> getCustomerWithdrawals(int customerId)
        {
            try
            {
                var response = await _walletWithdrawal.getByCustomerId(customerId);
                return Ok(response);
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("deposit/by-status")]
        public async Task<IActionResult> getDepositesByStatus(string status)
        {
            try
            {
                var response = await _walletDeposite.getByStatus(status);
                return Ok(response);
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("withdrawal/by-status")]
        public async Task<IActionResult> getWithdrawalsByStatus(string status)
        {
            try
            {
                var response = await _walletWithdrawal.getByStatus(status);
                return Ok(response);
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("deposite/by-payment-method")]
        public async Task<IActionResult> getDepositesByPaymentMethod(string paymentMethod)
        {
            try
            {
                var response = await _walletDeposite.getByPaymentMethod(paymentMethod);
                return Ok(response);
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("withdrawal/by-payment-method")]
        public async Task<IActionResult> getWithdrawalsByPaymentMethod(string paymentMethod)
        {
            try
            {
                var response = await _walletWithdrawal.getByPaymentMethod(paymentMethod);
                return Ok(response);
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("deposit/by-transaction-id")]
        public async Task<IActionResult> getDepositesByTransactionId(BigInteger transactionId)
        {
            try
            {
                var response = await _walletDeposite.getByTransactionId(transactionId);
                return Ok(response);
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("withdrawal/by-transaction-id")]
        public async Task<IActionResult> getWithdrawalsByTransactionId(BigInteger transactionId)
        {
            try
            {
                var response = await _walletWithdrawal.getByTransactionId(transactionId);
                return Ok(response);
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("deposit/by-reference-id")]
        public async Task<IActionResult> getDepositesByReferenceId(string referenceId)
        {
            try
            {
                var response = await _walletDeposite.getByReferenceId(referenceId);
                return Ok(response);
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("withdrawal/by-reference-id")]
        public async Task<IActionResult> getWithdrawalsByReferenceId(string referenceId)
        {
            try
            {
                var response = await _walletWithdrawal.getByReferenceId(referenceId);
                return Ok(response);
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("deposit/by-date")]
        public async Task<IActionResult> getDepositesByDate(DateTime date)
        {
            try
            {
                var response = await _walletDeposite.getByDate(date);
                return Ok(response);
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("withdrawal/by-date")]
        public async Task<IActionResult> getWithdrawalsByDate(DateTime date)
        {
            try
            {
                var response = await _walletWithdrawal.getByDate(date);
                return Ok(response);
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("deposit/by-date-range")]
        public async Task<IActionResult> getDepositesByDateRange(DateTime startDate, DateTime endDate)
        {
            try
            {
                var response = await _walletDeposite.getByDateRange(startDate, endDate);
                return Ok(response);
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("withdrawal/by-date-range")]
        public async Task<IActionResult> getWithdrawalsByDateRange(DateTime startDate, DateTime endDate)
        {
            try
            {
                var response = await _walletWithdrawal.getByDateRange(startDate, endDate);
                return Ok(response);
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("deposit/by-date-range/{customerId}")]
        public async Task<IActionResult> getDepositesByDateRangeForCustomer(int customerId, DateTime startDate, DateTime endDate)
        {
            try
            {
                var response = await _walletDeposite.getByDateRangeForCustomer(customerId, startDate, endDate);
                return Ok(response);
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("withdrawal/by-date-range/{customerId}")]
        public async Task<IActionResult> getWithdrawalsByDateRangeForCustomer(int customerId, DateTime startDate, DateTime endDate)
        {
            try
            {
                var response = await _walletWithdrawal.getByDateRangeForCustomer(customerId, startDate, endDate);
                return Ok(response);
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("deposit/total-amount/{walletId}")]
        public async Task<IActionResult> totalDepositeAmount(int walletId)
        {
            try
            {
                var response = await _walletDeposite.totalAmountByWalletId(walletId);
                return Ok(response);
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("withdrawal/total-amount/{walletId}")]
        public async Task<IActionResult> totalWithdrawalAmount(int walletId)
        {
            try
            {
                var response = await _walletWithdrawal.totalAmountByWalletId(walletId);
                return Ok(response);
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("deposit/customer-transaction-stats/{customerId}")]
        public async Task<IActionResult> customerTransactionStats(int customerId)
        {
            try
            {
                var response = await _walletDeposite.customerTransactionStats(customerId);
                return Ok(response);
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("withdrawal/customer-transaction-stats/{customerId}")]
        public async Task<IActionResult> customerWithdrawalTransactionStats(int customerId)
        {
            try
            {
                var response = await _walletWithdrawal.customerTransactionStats(customerId);
                return Ok(response);
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("deposit/amount-range")]
        public async Task<IActionResult> getDepositesByAmountRange(double startAmount, double endAmount)
        {
            try
            {
                var response = await _walletDeposite.getByAmountRange(startAmount, endAmount);
                return Ok(response);
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("withdrawal/amount-range")]
        public async Task<IActionResult> getWithdrawalsByAmountRange(double startAmount, double endAmount)
        {
            try
            {
                var response = await _walletWithdrawal.getByAmountRange(startAmount, endAmount);
                return Ok(response);
=======
>>>>>>> 568d50b (done with chat messages)
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        
>>>>>>> 0ca0962 (notification, location and other commits)
    }
}