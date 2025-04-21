using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Numerics;
using System.Text;
using System.Threading.Tasks;
using Api.DTO;
using Api.Helpers;
using Api.Interfaces;
using Api.Models;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace Api.Services
{
    public class DepositeService : IWalletDeposite
    {
        private readonly DBContext _context;
        private readonly IConfiguration _config;
        private readonly IMapper _mapper;
        private readonly IHttpClientFactory _ClientFactory;
        public DepositeService(DBContext context, IMapper mapper, IConfiguration config, IHttpClientFactory ClientFactory)
        {
            _context = context;
            _mapper = mapper;
            _config = config;
            _ClientFactory = ClientFactory;
        }
        readonly string errorMessage = "Deposit not found";
        
        public async Task<DepositeDto> createAsync(DepositeDto t)
        {
            try
            {
                var deposite = _mapper.Map<Deposite>(t);
                Wallet wallet = await _context.Wallets.FirstOrDefaultAsync(w => w.Id == t.WalletId) ?? throw new Exceptions.ServiceException("Wallet not found");
                wallet.InitialBalance = wallet.Balance;
                wallet.Balance += t.Amount;
                await _context.Deposites.AddAsync(deposite);
                await _context.SaveChangesAsync();
                return _mapper.Map<DepositeDto>(deposite);
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<object> customerTransactionStats(int customerId)
        {
            try
            {
                var totalDeposite = await _context.Deposites.Where(d => d.Wallet!.CustomerId == customerId).AsQueryable().ToListAsync();
                var totalWithdrawal = await _context.Withdrawals.Where(x => x.Wallet!.CustomerId == customerId).AsQueryable().ToListAsync();
                var totalDepositeSum = totalDeposite.Sum(x => x.Amount);
                var totalWithdrawalSum = totalWithdrawal.Sum(x => x.Amount);
                var totalTransaction = totalDepositeSum + totalWithdrawalSum;
                var totalBalance = totalDepositeSum - totalWithdrawalSum;
                return new
                {
                    totalDeposite = totalDepositeSum,
                    totalWithdrawal = totalWithdrawalSum,
                    totalTransaction = totalTransaction,
                    totalBalance = totalBalance
                };
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<string> deleteAsync(int id)
        {
            try
            {
                var deposite = await _context.Deposites.FirstOrDefaultAsync(d => d.Id == id);
                if (deposite == null)
                {
                    throw new Exceptions.ServiceException(errorMessage);
                }
                _context.Deposites.Remove(deposite);
                await _context.SaveChangesAsync();
                return "Deposite deleted successfully";
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<List<DepositeDto>> getAllAsync()
        {
            try
            {
                var deposite = await _context.Deposites.AsQueryable().ToListAsync();
                return _mapper.Map<List<DepositeDto>>(deposite);
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<PagedList<DepositeDto>> getAllAsync(SearchPaging props)
        {
            try
            {
                IQueryable<DepositeDto> DepositeList = Enumerable.Empty<DepositeDto>().AsQueryable();
                if (props.SearchString == null)
                {
                    var deposites = await _context.Deposites
                    .Include(d => d.Wallet)
                    .ThenInclude(w => w!.Customer)
                    .OrderByDescending(d => d.CreatedAt)
                    .ToListAsync();
                    DepositeList.Concat(_mapper.Map<List<DepositeDto>>(deposites));
                    var result = PagedList<DepositeDto>.ToPagedList(DepositeList, props.PageNumber, props.PageSize);
                    return result;
                }
                else
                {
                    var deposites = await _context.Deposites
                    .Include(d => d.Wallet)
                    .ThenInclude(w => w!.Customer)
                    .Where(d => d.Wallet!.Customer!.FirstName!.Contains(props.SearchString))
                    .OrderByDescending(d => d.CreatedAt)
                    .ToListAsync();
                    DepositeList.Concat(_mapper.Map<List<DepositeDto>>(deposites));
                    var result = PagedList<DepositeDto>.ToPagedList(DepositeList, props.PageNumber, props.PageSize);
                    return result;
                }
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<DepositeDto> getAsync(int id)
        {
            try
            {
                var deposite = await _context.Deposites
                .Include(d => d.Wallet).ThenInclude(w => w!.Customer)
                .FirstOrDefaultAsync(d => d.Id == id);
                return _mapper.Map<DepositeDto>(deposite);
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<List<DepositeDto>> getByAmountRange(double startAmount, double endAmount)
        {
            try
            {
                var deposites = await _context.Deposites
                .Where(d => d.Amount >= startAmount && d.Amount <= endAmount)
                .Include(d => d.Wallet).ThenInclude(w => w!.Customer)
                .AsQueryable().ToListAsync();
                return _mapper.Map<List<DepositeDto>>(deposites);
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<List<DepositeDto>> getByCustomerId(int customerId)
        {
            try
            {
                var deposites = await _context.Deposites
                .Where(d => d.Wallet!.CustomerId == customerId)
                .Include(d => d.Wallet).ThenInclude(w => w!.Customer)
                .OrderByDescending(d => d.CreatedAt)
                .ToListAsync();
                return _mapper.Map<List<DepositeDto>>(deposites);
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<List<DepositeDto>> getByDate(DateTime date)
        {
            try
            {
                var deposites = await _context.Deposites
                .Where(d => d.CreatedAt!.Value.Date == date.Date)
                .Include(d => d.Wallet).ThenInclude(w => w!.Customer)
                .OrderByDescending(d => d.CreatedAt)
                .ToListAsync();
                return _mapper.Map<List<DepositeDto>>(deposites);
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<List<DepositeDto>> getByDateRange(DateTime startDate, DateTime endDate)
        {
            try
            {
                var deposites = await _context.Deposites
                .Where(d => d.CreatedAt!.Value.Date >= startDate.Date && d.CreatedAt!.Value.Date <= endDate.Date)
                .Include(d => d.Wallet).ThenInclude(w => w!.Customer)
                .OrderByDescending(d => d.CreatedAt)
                .ToListAsync();
                return _mapper.Map<List<DepositeDto>>(deposites);
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<List<DepositeDto>> getByDateRangeForCustomer(int CustomerId, DateTime startDate, DateTime endDate)
        {
            try
            {
                var deposites = await _context.Deposites
                .Where(d => d.CreatedAt!.Value.Date >= startDate.Date && d.CreatedAt!.Value.Date <= endDate.Date && d.Wallet!.CustomerId == CustomerId)
                .Include(d => d.Wallet).ThenInclude(w => w!.Customer)
                .OrderByDescending(d => d.CreatedAt)
                .ToListAsync();
                return _mapper.Map<List<DepositeDto>>(deposites);
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<List<DepositeDto>> getByPaymentMethod(string paymentMethod)
        {
            try
            {
                var deposites = await _context.Deposites
                .Where(d => d.PaymentMethod!.ToLower() == paymentMethod.ToLower())
                .Include(d => d.Wallet).ThenInclude(w => w!.Customer)
                .OrderByDescending(d => d.CreatedAt)
                .ToListAsync();
                return _mapper.Map<List<DepositeDto>>(deposites);
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<List<DepositeDto>> getByReferenceId(string referenceId)
        {
            try
            {
                var deposites = await _context.Deposites
                .Where(d => d.ReferenceId!.ToLower() == referenceId.ToLower())
                .Include(d => d.Wallet).ThenInclude(w => w!.Customer)
                .OrderByDescending(d => d.CreatedAt)
                .ToListAsync();
                return _mapper.Map<List<DepositeDto>>(deposites);
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<List<DepositeDto>> getByStatus(string status)
        {
            try
            {
                var deposites = await _context.Deposites
                .Where(d => d.Status!.ToLower() == status.ToLower())
                .Include(d => d.Wallet).ThenInclude(w => w!.Customer)
                .OrderByDescending(d => d.CreatedAt)
                .ToListAsync();
                return _mapper.Map<List<DepositeDto>>(deposites);
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<List<DepositeDto>> getByTransactionId(BigInteger transactionId)
        {
            try
            {
                var deposites = await _context.Deposites
                .Where(d => d.TransactionId == transactionId)
                .Include(d => d.Wallet).ThenInclude(w => w!.Customer)
                .OrderByDescending(d => d.CreatedAt)
                .ToListAsync();
                return _mapper.Map<List<DepositeDto>>(deposites);
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<List<DepositeDto>> getByWalletId(int walletId)
        {
            try
            {
                var deposites = await _context.Deposites
                .Where(d => d.WalletId == walletId)
                .Include(d => d.Wallet).ThenInclude(w => w!.Customer)
                .OrderByDescending(d => d.CreatedAt)
                .ToListAsync();
                return _mapper.Map<List<DepositeDto>>(deposites);
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<PagedList<DepositeDto>> getByWalletId(int walletId, SearchPaging props)
        {
            try
            {
                IQueryable<DepositeDto> DepositeList = Enumerable.Empty<DepositeDto>().AsQueryable();
                if (props.SearchString == null)
                {
                    var deposites = await _context.Deposites
                    .Where(d => d.WalletId == walletId)
                    .Include(d => d.Wallet).ThenInclude(w => w!.Customer)
                    .OrderByDescending(d => d.CreatedAt)
                    .ToListAsync();
                    DepositeList.Concat(_mapper.Map<List<DepositeDto>>(deposites));
                    var result = PagedList<DepositeDto>.ToPagedList(DepositeList, props.PageNumber, props.PageSize);
                    return result;
                }
                else
                {
                    var deposites = await _context.Deposites
                    .Where(d => d.WalletId == walletId && d.Wallet!.Customer!.FirstName!.Contains(props.SearchString))
                    .Include(d => d.Wallet).ThenInclude(w => w!.Customer)
                    .OrderByDescending(d => d.CreatedAt)
                    .ToListAsync();
                    DepositeList.Concat(_mapper.Map<List<DepositeDto>>(deposites));
                    var result = PagedList<DepositeDto>.ToPagedList(DepositeList, props.PageNumber, props.PageSize);
                    return result;
                }
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<double> totalAmountByWalletId(int WalletId)
        {
            try
            {
                var totalAmount = await _context.Deposites
                .Where(d => d.WalletId == WalletId)
                .SumAsync(d => d.Amount);
                return totalAmount;
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<DepositeDto> updateAsync(int id, DepositeDto t)
        {
            try
            {
                var deposite = await _context.Deposites.FirstOrDefaultAsync(d => d.Id == id);
                if (deposite == null)
                {
                    throw new Exceptions.ServiceException(errorMessage);
                }
                var updatedDeposite = _mapper.Map<Deposite>(t);
                updatedDeposite.UpdatedAt = DateTime.UtcNow;
                _context.Entry(deposite).CurrentValues.SetValues(updatedDeposite);
                await _context.SaveChangesAsync();
                return _mapper.Map<DepositeDto>(updatedDeposite);
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<object> initiateWalletDepositWeb(InitiateDepositeDto initiateDepositeDto)
        {
            try
            {
                var wallet = await _context.Wallets.FirstOrDefaultAsync(w => w.Id == initiateDepositeDto.WalletId);
                if (wallet == null) throw new Exceptions.ServiceException("Wallet not found");
                var customer = await _context.Customers.FirstOrDefaultAsync(c => c.Id == wallet.CustomerId);
                var depositeData = new
                {
                    amount = initiateDepositeDto.Amount,
                    walletId = initiateDepositeDto.WalletId,
                    type = "Deposite",
                    CreatedAt = DateTime.UtcNow
                };
                var tx_ref = GenerateTxRef.genTx_rf();
                var redirect_url = _config["Base_Url:Frontend_remote"] + "/shop/payment-response";
                // var redirect_url = _config["Base_Url:Local"] + "/walletDeposite/confirmDeposite";
                string paymentUrl = _config["Paystack:Initialize_Payment_Url"]!;
                var payload = new
                {
                    email = customer!.Email,
                    amount = initiateDepositeDto.Amount * 100,
                    reference = tx_ref,
                    callback_url = redirect_url,
                    metadata = depositeData
                };

                var jsonPayload = JsonConvert.SerializeObject(payload);

                var request = new HttpRequestMessage(HttpMethod.Post, paymentUrl);

                //create an an instance of IHttpclientFactory
                var client = _ClientFactory.CreateClient();

                request.Content = new StringContent(jsonPayload, Encoding.UTF8, "application/json");

                //add the auth token to the header
                request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", _config["Paystack:Secret_key"]);
                // request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", "sk_test_c7c794bf42d409179d35cf75f239a5949790ee49");

                //send request and get the respond
                HttpResponseMessage response = await client.SendAsync(request, HttpCompletionOption.ResponseHeadersRead);

                if (response.StatusCode == System.Net.HttpStatusCode.OK)
                {
                    var apiString = await response.Content.ReadAsStringAsync();
                    var paymentRes = JsonConvert.DeserializeObject<PaystackJsonResponse>(apiString);
                    string link = paymentRes!.data!.authorization_url!;
                    return new
                    {
                        link = link
                    };
                }
                throw new Exceptions.ServiceException(response.ReasonPhrase!.ToString());
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<object> initiateWalletDeposit(InitiateDepositeDto initiateDepositeDto)
        {
            try
            {
                var wallet = await _context.Wallets.FirstOrDefaultAsync(w => w.Id == initiateDepositeDto.WalletId);
                if (wallet == null) throw new Exceptions.ServiceException("Wallet not found");
                var customer = await _context.Customers.FirstOrDefaultAsync(c => c.Id == wallet.CustomerId);
                var depositeData = new
                {
                    amount = initiateDepositeDto.Amount,
                    walletId = initiateDepositeDto.WalletId,
                    type = "Deposit",
                    CreatedAt = DateTime.UtcNow
                };
                var tx_ref = GenerateTxRef.genTx_rf();
                // var redirect_url = _config["Base_Url:Frontend_remote"] + "/shop/payment-response";
                var redirect_url = _config["Base_Url:Remote_GCP"] + "/walletDeposite/confirmDeposite";
                string paymentUrl = _config["Paystack:Initialize_Payment_Url"]!;
                var webhook_url = _config["Base_Url:Remote_GCP"] + "webhook/paystack-webhook";
                var payload = new
                {
                    email = customer!.Email,
                    amount = initiateDepositeDto.Amount * 100,
                    reference = tx_ref,
                    callback_url = redirect_url,
                    metadata = depositeData,
                    webhook_url
                };

                var jsonPayload = JsonConvert.SerializeObject(payload);

                var request = new HttpRequestMessage(HttpMethod.Post, paymentUrl);

                //create an an instance of IHttpclientFactory
                var client = _ClientFactory.CreateClient();

                request.Content = new StringContent(jsonPayload, Encoding.UTF8, "application/json");

                //add the auth token to the header
                request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", _config["Paystack:Secret_Key"]);
                // request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", "sk_test_c7c794bf42d409179d35cf75f239a5949790ee49");

                //send request and get the respond
                HttpResponseMessage response = await client.SendAsync(request, HttpCompletionOption.ResponseHeadersRead);

                if (response.StatusCode == System.Net.HttpStatusCode.OK)
                {
                    var apiString = await response.Content.ReadAsStringAsync();
                    var paymentRes = JsonConvert.DeserializeObject<PaystackJsonResponse>(apiString);
                    string link = paymentRes!.data!.authorization_url!;
                    return new
                    {
                        link = link
                    };
                }
                throw new Exceptions.ServiceException(response.ReasonPhrase!.ToString());
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<object> confirmWalletDeposit(string reference)
        {
            try
            {
                var initial_deposite = await _context.Deposites.FirstOrDefaultAsync(d => d.ReferenceId == reference);
                
                if (initial_deposite != null)
                {
                    return new
                    {
                        message = "Deposit already verified",
                    };
                }

                string paymentUrl = _config["Paystack:Verify_Payment_Url"] + "/" + reference;
                var request = new HttpRequestMessage(HttpMethod.Get, paymentUrl);
                var client = _ClientFactory.CreateClient();
                request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", _config["Paystack:Secret_Key"]);
                // request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", "sk_test_c7c794bf42d409179d35cf75f239a5949790ee49");
                HttpResponseMessage response = await client.SendAsync(request, HttpCompletionOption.ResponseHeadersRead);
                if (response.StatusCode == System.Net.HttpStatusCode.OK)
                {
                    var apiString = await response.Content.ReadAsStringAsync();
                    var paymentRes = JsonConvert.DeserializeObject<DepositeVerificationResponse>(apiString);

                    //insert transaction into the database
                    var transaction = new Transaction();
                    transaction.Status = paymentRes!.data!.status;
                    transaction.StatusBool = paymentRes!.status;
                    transaction.AmountPaid = (Double)paymentRes.data!.amount! / 100;
                    transaction.TransactionRef = reference;
                    transaction.PaymentId = (BigInteger)paymentRes.data!.id!;
                    transaction.TotalAmount = paymentRes.data!.metadata!.amount;
                    transaction.PaidAt = paymentRes.data!.paid_at;
                    transaction.PaymentChannel = paymentRes.data!.channel;
                    transaction.Type = "Deposit";
                    transaction.WalletId = paymentRes.data.metadata!.walletId;
                    transaction.StatusBool = paymentRes.status;


                    var deposite = new Deposite();
                    deposite.Status = paymentRes!.data!.status;
                    deposite.Type = "Deposit";
                    deposite.TransactionId = (BigInteger)paymentRes.data!.id!;
                    deposite.Amount = (Double)paymentRes.data!.amount! / 100;
                    deposite.ReferenceId = reference;
                    deposite.WalletId = paymentRes.data.metadata!.walletId;
                    deposite.CreatedAt = paymentRes.data.paid_at;
                    deposite.UpdatedAt = paymentRes.data.paid_at;
                    deposite.PaymentMethod = paymentRes.data.channel; 
                    
                    var wallet = await _context.Wallets.FirstOrDefaultAsync(w => w.Id == deposite.WalletId);
                    if (wallet == null) throw new Exceptions.ServiceException("Wallet not found");

                    wallet.InitialBalance = wallet.Balance;
                    wallet.Balance += deposite.Amount;
                    wallet.UpdatedAt = DateTime.UtcNow;

                    await _context.Deposites.AddAsync(deposite);
                    await _context.Transactions.AddAsync(transaction);
                    _context.Wallets.Update(wallet);
                    await _context.SaveChangesAsync();

                    return paymentRes!;
                }
                throw new Exceptions.ServiceException(response.ReasonPhrase!.ToString());
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }
    }
}
