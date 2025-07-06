using Api.DTO;
using Api.Helpers;
using Api.Interfaces;
using Api.Models;
using AutoMapper;
//using Api.Services;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System.Net.Http.Headers;
using System.Numerics;
using System.Text;
using System.Threading.Tasks;
using System.Net.Http;
using Api.Exceptions;

namespace Api.Services
{
    public class TransactionService : ITransaction
    {
        private readonly DBContext _dbContext;
        private readonly IMapper _mapper;
        private readonly IConfiguration _config;
        private readonly IHttpClientFactory _ClientFactory;
        private readonly IVoucher _ivoucher;
        private readonly HttpClient _httpClient;
        private readonly IWebHookService _webhookService;
        private readonly ILogger<TransactionService> _logger;
        public TransactionService(DBContext dbContext,
        IMapper mapper,
        IConfiguration config,
        IHttpClientFactory clientFactory,
        IVoucher ivoucher,
        HttpClient httpClient,
        IWebHookService webHookService,
        ILogger<TransactionService> logger)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _config = config;
            _ClientFactory = clientFactory;
            _ivoucher = ivoucher;
            _httpClient = httpClient;
            _webhookService = webHookService;
            _logger = logger;
        }

        public async Task<IEnumerable<TransactionDto>> AllAsync()
        {
            try
            {
                var transactions = await _dbContext.Transactions
                    .Include(t => t.Order)
                    .ThenInclude(o => o!.Customer)
                    .OrderByDescending(t => t.CreatedAt)
                    .ToListAsync();
                var transactionDTO = _mapper.Map<List<TransactionDto>>(transactions);
                return transactionDTO;
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<object> BaniCheckout(InitiatePaymentDto initiatePaymentDto)
        {
            try
            {
                var payment = await _dbContext.Transactions.FirstOrDefaultAsync(t => t.OrderId == initiatePaymentDto.OrderId);
                if (payment != null)
                {
                    throw new Exceptions.ServiceException("Already paid for this order");
                }
                var order = await _dbContext.Orders.Include(o => o.Customer).FirstOrDefaultAsync(o => o.Id == initiatePaymentDto.OrderId);
                if (order == null) throw new Exceptions.ServiceException("Order not found");
                var tx_ref = GenerateTxRef.genTx_rf();
                var paymentUrl = _config["Bani:Stage_Base_Url"] + "/partner/collection/bank_transfer/";
                var access_token = _config["Bani:Access_Token"];
                var payload = new BaniCheckoutDto
                {
                    holder_account_type = "temporary",
                    pay_currency = "NGN",
                    country_code = "NG",
                    pay_va_step = "direct",
                    pay_expiry = 20,
                    pay_ext_ref = tx_ref,
                    pay_amount = (Double)initiatePaymentDto.TotalAmount!,
                    custom_data = new Custom_data
                    {
                        customerId = order.CustomerId,
                        voucherCode = initiatePaymentDto.VoucherCode,
                        orderId = order.Id,
                        deliveryFee = (Double)initiatePaymentDto.DeliveryFee!,
                        amount = (Double)initiatePaymentDto.Amount!,
                        totalAmount = (Double)initiatePaymentDto.TotalAmount!,
                        createdAt = DateTime.UtcNow
                    }
                };
                var jsonPayload = JsonConvert.SerializeObject(payload);
                var moni_signature = MoniSignature.GetSignature(_config);

                var content = new StringContent(jsonPayload, Encoding.UTF8, "application/json");
                var request = new HttpRequestMessage(HttpMethod.Post, paymentUrl)
                {
                    Content = content // Attach the payload content here
                };
                request.Headers.Add("Authorization", "Bearer " + access_token); // Replace with your actual token
                request.Headers.Add("moni-signature", moni_signature); // Add any other desired headers

                var response = await _httpClient.SendAsync(request);
                if (response.StatusCode == System.Net.HttpStatusCode.OK)
                {
                    var responseBody = await response.Content.ReadAsStringAsync();
                    return responseBody;
                }
                throw new Exceptions.ServiceException(response.ReasonPhrase!.ToString());
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<PaymentDetailsDto> ConfirmPayment(AfterPayment transactionInfo)
        {
            try
            {
                var initial_transaction = await _dbContext.Transactions.FirstOrDefaultAsync(t => t.PaymentId == BigInteger.Parse(transactionInfo.transaction_id!));
                if (initial_transaction != null)
                {
                    var paidTransaction = new PaymentDetailsDto
                    {
                        Status = initial_transaction.Status,
                        Data = { }
                    };
                    return paidTransaction;
                }
                //this is the uri
                var request = new HttpRequestMessage(HttpMethod.Get,
                $"https://api.flutterwave.com/v3/transactions/{transactionInfo.transaction_id}/verify");
                //create an an instance of IHttpclientFactory
                var client = _ClientFactory.CreateClient();
                //add the auth token to the header
                request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", _config["FW_Payment:Secret_key"]);
                //send request and get the respond
                HttpResponseMessage response = await client.SendAsync(request, HttpCompletionOption.ResponseHeadersRead);

                if (response.StatusCode == System.Net.HttpStatusCode.OK)
                {
                    //convert the respond to string
                    var apiString = await response.Content.ReadAsStringAsync();
                    //deserialize it to json object
                    var paymentRes = JsonConvert.DeserializeObject<PaymentDetailsDto>(apiString);

                    if (paymentRes!.Status == "success")
                    {
                        var transaction = new Transaction();
                        transaction.Status = paymentRes.Status;
                        transaction.AmountPaid = paymentRes.Data!.Amount;
                        transaction.TransactionRef = paymentRes.Data!.Tx_ref;
                        transaction.PaymentId = (BigInteger)paymentRes.Data!.Id!;
                        transaction.TotalAmount = paymentRes.Data!.Meta!.totalAmount;
                        transaction.OrderId = (int)paymentRes.Data!.Meta.orderId!;
                        if (paymentRes.Data!.Meta.voucherCode != null)
                        {
                            var voucher = await _ivoucher.searchWithCode(paymentRes.Data!.Meta.voucherCode!);
                            transaction.VoucherId = voucher.Id;
                        }
                        // var voucher = await _ivoucher.searchWithCode(paymentRes.Data!.Meta.voucherCode!);
                        // transaction.VoucherId = voucher.Id;

                        await _dbContext.Transactions.AddAsync(transaction);
                        await _dbContext.SaveChangesAsync();

                        return paymentRes;
                    }
                    throw new Exceptions.ServiceException(paymentRes.Status!);
                }
                throw new Exceptions.ServiceException("Response not Ok");
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<TransactionDto> GetTransactionByOrderId(int orderId)
        {
            try
            {
                var transaction = await _dbContext.Transactions.FirstOrDefaultAsync(t => t.OrderId == orderId);
                if (transaction == null) throw new Exceptions.ServiceException("Transaction not found");
                var transactionDTO = _mapper.Map<TransactionDto>(transaction);
                return transactionDTO;
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public Task<TransactionDto> CreateAsync(TransactionDto transaction)
        {
            throw new NotImplementedException();
        }

        public async Task<string> DeleteAsync(int id)
        {
            try
            {
                var transaction = await _dbContext.Transactions
                    .FirstOrDefaultAsync(t => t.Id == id);
                if (transaction == null) throw new Exceptions.ServiceException("Transaction not found");
                _dbContext.Transactions.Remove(transaction);
                await _dbContext.SaveChangesAsync();
                return "Transaction deleted";
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<TransactionDto> GetAsync(int id)
        {
            try
            {
                var transaction = await _dbContext.Transactions
                    .Include(t => t.Order)
                    .ThenInclude(o => o!.Customer)
                    .FirstOrDefaultAsync(t => t.Id == id);
                if (transaction == null) throw new Exceptions.ServiceException("Transaction not found");
                var transactionDTO = _mapper.Map<TransactionDto>(transaction);
                return transactionDTO;
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<TransactionDto> GetByReference(string reference)
        {
            try
            {
                var transaction = await _dbContext.Transactions
                    .Where(t => t.TransactionRef == reference)
                    .Include(t => t.Order)
                    .ThenInclude(o => o!.Customer)
                    .FirstOrDefaultAsync();
                if(transaction == null) throw new ServiceException("Transaction not found");
                var transactionDTO = _mapper.Map<TransactionDto>(transaction);
                return transactionDTO;
            }
            catch (Exception ex)
            {
                throw new ServiceException(ex.Message);
            }
        }

        public async Task<TransactionDto> GetByPaymentId(BigInteger transactionId)
        {
            try
            {
                var transaction = await _dbContext.Transactions
                    .Include(t => t.Order)
                    .ThenInclude(o => o!.Customer)
                    .FirstOrDefaultAsync(t => t.PaymentId == transactionId);
                if (transaction == null) throw new Exceptions.ServiceException("Transaction not found");
                var transactionDTO = _mapper.Map<TransactionDto>(transaction);
                return transactionDTO;
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<DTO.Data> InitiatePayment(InitiatePaymentDto initiatePayment)
        {
            try
            {
                var payment = await _dbContext.Transactions.FirstOrDefaultAsync(t => t.OrderId == initiatePayment.OrderId);
                if (payment != null)
                {
                    throw new Exceptions.ServiceException("Already paid for this order");
                }
                var order = await _dbContext.Orders.Include(o => o.Customer).FirstOrDefaultAsync(o => o.Id == initiatePayment.OrderId);
                if (order == null) throw new Exceptions.ServiceException("Order not found");
                var tx_ref = GenerateTxRef.genTx_rf();
                // string redirectUrl = _config["Base_Url:Local"] + "/transaction/confirmPayment";
                string redirectUrl = Environment.GetEnvironmentVariable("FRONTEND_REMOTE_URL") ?? _config["Base_Url:Frontend_remote"] + "/shop/payment-response";
                Customer_Info customer = new Customer_Info();
                customer.email = order.Customer!.Email;
                customer.phone_number = order.Customer.PhoneNumber;
                customer.name = order.Customer.FirstName;
                Customizations customizations = new Customizations();
                customizations.title = "LifePadi";
                customizations.description = "Service payment";
                customizations.logo = "https://res.cloudinary.com/dbxapeqzu/image/upload/v1724785015/LifePadi/logo/Logo_dark_ndhilz.svg";

                Meta meta = new Meta();
                meta.totalAmount = (Double)initiatePayment.TotalAmount!;
                meta.deliveryFee = (Double)initiatePayment.DeliveryFee!;
                meta.orderId = initiatePayment.OrderId;
                meta.voucherCode = initiatePayment.VoucherCode;
                meta.createdAt = DateTime.UtcNow;

                MakePaymentDetails jsonPayload = new MakePaymentDetails();
                jsonPayload.amount = (Double)initiatePayment.Amount!;
                jsonPayload.tx_ref = tx_ref;
                jsonPayload.redirect_url = redirectUrl;
                jsonPayload.currency = "NGN";
                jsonPayload.meta = meta;
                jsonPayload.customer = customer;
                jsonPayload.customizations = customizations;

                // Convert the payload to JSON string
                var jsonPayloadString = JsonConvert.SerializeObject(jsonPayload);

                var request = new HttpRequestMessage(HttpMethod.Post, "https://api.flutterwave.com/v3/payments");

                //create an an instance of IHttpclientFactory
                var client = _ClientFactory.CreateClient();

                request.Content = new StringContent(jsonPayloadString, Encoding.UTF8, "application/json");

                //add the auth token to the header
                request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", _config["FW_Payment:Secret_key"]);

                //send request and get the respond
                HttpResponseMessage response = await client.SendAsync(request, HttpCompletionOption.ResponseHeadersRead);

                //check if the respond status is successful
                if (response.StatusCode == System.Net.HttpStatusCode.OK)
                {
                    //convert the respond to string
                    var apiString = await response.Content.ReadAsStringAsync();

                    var paymentRes = JsonConvert.DeserializeObject<JsonResponse>(apiString);
                    // Console.WriteLine(paymentRes);
                    if (paymentRes!.status == "success")
                    {
                        return new DTO.Data
                        {
                            link = paymentRes.data!.link
                        };
                    }
                    throw new Exceptions.ServiceException("Payment not successful");
                }
                throw new Exceptions.ServiceException(response.StatusCode.ToString());
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<object> MobilePaystackCheckout(InitiatePaymentDto initiatePaymentDto)
        {
            try
            {
                var payment = await _dbContext.Transactions.FirstOrDefaultAsync(t => t.OrderId == initiatePaymentDto.OrderId);
                if (payment != null)
                {
                    return new
                    {
                        message = "Already paid for this order",
                    };
                }
                var order = await _dbContext.Orders.Include(o => o.Customer).FirstOrDefaultAsync(o => o.Id == initiatePaymentDto.OrderId);
                if (order == null) throw new Exceptions.ServiceException("Order not found");
                var customerData = new
                {
                    voucherCode = initiatePaymentDto.VoucherCode,
                    orderId = initiatePaymentDto.OrderId,
                    amount = initiatePaymentDto.Amount,
                    totalAmount = initiatePaymentDto.TotalAmount,
                    deliveryFee = initiatePaymentDto.DeliveryFee,
                    type = initiatePaymentDto.Type,
                    createdAt = DateTime.UtcNow
                };
                var tx_ref = GenerateTxRef.genTx_rf();
                // var redirect_url = Environment.GetEnvironmentVariable("FRONTEND_REMOTE_URL") ?? _config["Base_Url:Frontend_remote"] + "/shop/payment-response";
                var redirect_url = Environment.GetEnvironmentVariable("FRONTEND_REMOTE_URL") ?? _config["Base_Url:Frontend_Remote_SubDomain"] + "/payment/confirm";
                string paymentUrl = _config["Paystack:Initialize_Payment_Url"]!;
                var webhook_url = Environment.GetEnvironmentVariable("API_REMOTE_GCP_URL") ?? _config["Base_Url:Remote_GCP"] + "webhook/paystack-webhook";
                var payload = new
                {
                    email = order.Customer!.Email,
                    amount = Math.Round(initiatePaymentDto.TotalAmount * 100, 1),
                    reference = tx_ref,
                    callback_url = redirect_url,
                    metadata = customerData,
                    webhook_url
                };

                var jsonPayload = JsonConvert.SerializeObject(payload);

                var request = new HttpRequestMessage(HttpMethod.Post, paymentUrl);

                //create an an instance of IHttpclientFactory
                var client = _ClientFactory.CreateClient();

                request.Content = new StringContent(jsonPayload, Encoding.UTF8, "application/json");

                //add the auth token to the header
                request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", Environment.GetEnvironmentVariable("PAYSTACK_SECRET_KEY") ?? _config["Paystack:Secret_Key"]);
                //request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", _config["Paystack:Test_Key"]);

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

        public async Task<object> PaystackCheckout(InitiatePaymentDto initiatePaymentDto)
        {
            try
            {
                var payment = await _dbContext.Transactions.FirstOrDefaultAsync(t => t.OrderId == initiatePaymentDto.OrderId);
                if (payment != null)
                {
                    return new
                    {
                        message = "Already paid for this order",
                    };
                }
                var order = await _dbContext.Orders.Include(o => o.Customer).FirstOrDefaultAsync(o => o.Id == initiatePaymentDto.OrderId);
                if (order == null) throw new Exceptions.ServiceException("Order not found");
                var customerData = new
                {
                    voucherCode = initiatePaymentDto.VoucherCode,
                    orderId = initiatePaymentDto.OrderId,
                    amount = initiatePaymentDto.Amount,
                    totalAmount = initiatePaymentDto.TotalAmount,
                    deliveryFee = initiatePaymentDto.DeliveryFee,
                    createdAt = DateTime.UtcNow
                };
                var tx_ref = GenerateTxRef.genTx_rf();
                var redirect_url = Environment.GetEnvironmentVariable("FRONTEND_REMOTE_URL") ?? _config["Base_Url:Frontend_remote"] + "/shop/payment-response";
                // var redirect_url = _config["Base_Url:Local"] + "/transaction/paystack-confirmPayment";
                string paymentUrl = _config["Paystack:Initialize_Payment_Url"]!;
                var payload = new
                {
                    email = order.Customer!.Email,
                    amount = initiatePaymentDto.TotalAmount * 100,
                    reference = tx_ref,
                    callback_url = redirect_url,
                    metadata = customerData
                };

                var jsonPayload = JsonConvert.SerializeObject(payload);

                var request = new HttpRequestMessage(HttpMethod.Post, paymentUrl);

                //create an an instance of IHttpclientFactory
                var client = _ClientFactory.CreateClient();

                request.Content = new StringContent(jsonPayload, Encoding.UTF8, "application/json");

                //add the auth token to the header
                request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", Environment.GetEnvironmentVariable("PAYSTACK_SECRET_KEY") ?? _config["Paystack:Secret_key"]);

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

        public async Task<object> PaystackVerifyPayment(string reference)
        {
            try
            {
                var initial_transaction = await _dbContext.Transactions.FirstOrDefaultAsync(t => t.TransactionRef == reference);
                if (initial_transaction != null)
                {
                    return new
                    {
                        message = "Transaction already verified",
                        verified = true,
                        transaction = initial_transaction
                    };
                }

                string paymentUrl = _config["Paystack:Verify_Payment_Url"] + "/" + reference;
                var request = new HttpRequestMessage(HttpMethod.Get, paymentUrl);
                var client = _ClientFactory.CreateClient();
                request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", Environment.GetEnvironmentVariable("PAYSTACK_SECRET_KEY") ?? _config["Paystack:Secret_Key"]);
                //request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", _config["Paystack:Test_Key"]);
                HttpResponseMessage response = await client.SendAsync(request, HttpCompletionOption.ResponseHeadersRead);
                if (!(response.StatusCode == System.Net.HttpStatusCode.OK))
                {
                    throw new ServiceException(
                   new
                   {
                       message = response.ReasonPhrase!.ToString(),
                       verified = false
                   }

                   );
                }

                var apiString = await response.Content.ReadAsStringAsync();
                var paymentRes = JsonConvert.DeserializeObject<PaystackVerificationResponse>(apiString);

                if (paymentRes!.data!.metadata!.walletId! != null)
                {
                    var transaction = await ProcessWalletDeposit(paymentRes.data);
                    return new
                    {
                        message = paymentRes.message,
                        verified = true,
                        transaction = transaction


                    };

                }

                var transaction1 = await ProcessOrderPayment(paymentRes.data);
                return new
                {
                    message = paymentRes.message,
                    verified = true,
                    transaction = transaction1
                };
            }
            catch (Exception ex)
            {
                throw new ServiceException(ex.Message);
            }
        }
        

        public async Task<int> TotalNumberOfFailedTransactions()
        {
            try
            {
                var transactions = await _dbContext.Transactions.Where(t => t.Status == "failed").CountAsync();
                return transactions;
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<int> TotalNumberOfPendingTransactions()
        {
            try
            {
                var transactions = await _dbContext.Transactions.Where(t => t.Status == "pending").CountAsync();
                return transactions;
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<int> TotalNumberOfSuccessfulTransactions()
        {
            try
            {
                var transactions = await _dbContext.Transactions.Where(t => t.Status == "success").CountAsync();
                return transactions;
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<int> TotalNumberOfTransactions()
        {
            try
            {
                var transactions = await _dbContext.Transactions.CountAsync();
                return transactions;
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<object> TransactionStats()
        {
            try
            {
                var stats = new
                {
                    totalNumberOfTransactions = await TotalNumberOfTransactions(),
                    totalNumberOfSuccessfulTransactions = await TotalNumberOfSuccessfulTransactions(),
                    totalNumberOfFailedTransactions = await TotalNumberOfFailedTransactions(),
                    totalNumberOfPendingTransactions = await TotalNumberOfPendingTransactions()
                };
                return stats;
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public Task<TransactionDto> UpdateAsync(TransactionDto transaction, int id)
        {
            throw new NotImplementedException();
        }


        //process order payment
        public async Task<object> ProcessOrderPayment(PaystackVerificationData data)
        {
            try
            {
                var transaction = new Transaction
                {
                    Status = data.status,
                    StatusBool = true,
                    AmountPaid = (double)data.amount! / 100,
                    TransactionRef = data.reference,
                    PaymentId = (BigInteger)data.id,
                    TotalAmount = data.metadata!.totalAmount,
                    OrderId = data.metadata.orderId,
                    DeliveryFee = data.metadata.deliveryFee,
                    PaidAt = data.paid_at,
                    PaymentChannel = data.channel,
                    SubTotal = data.metadata.amount,
                    Type = data.metadata.type
                };

                // Handle voucher if exists
                if (!string.IsNullOrEmpty(data.metadata.voucherCode))
                {
                    await ProcessVoucher(data, transaction);
                }

                // Update order status
                var order = await _dbContext.Orders.FindAsync(data.metadata.orderId);
                if (order != null)
                {
                    order.Status = "Ongoing";
                    order.PaymentMethod = "PayStack";
                    order.SearchString = $"{order.Status.ToUpper()} {order.Type?.ToUpper()} {order.Order_Id}";
                }

                await _dbContext.Transactions.AddAsync(transaction);
                await _dbContext.SaveChangesAsync();


                _logger.LogInformation($"Processed order payment: {data.reference}");
                return transaction;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error processing order payment: {data.reference}");
                throw new ServiceException(ex.Message);
            }
        }

//process voucher
        private async Task ProcessVoucher(PaystackVerificationData data, Transaction transaction)
        {
            try
            {
                var voucher = await _ivoucher.searchWithCode(data.metadata!.voucherCode!);
                var order = await _dbContext.Orders.FindAsync(transaction.OrderId);

                if (order == null) return;

                var customerVoucher = await _dbContext.CustomerVouchers
                    .FirstOrDefaultAsync(cv => cv.CustomerId == order.CustomerId && cv.VoucherId == voucher.Id);

                if (customerVoucher == null)
                {
                    var newCustomerVoucher = new CustomerVoucher
                    {
                        CustomerId = order.CustomerId,
                        VoucherId = voucher.Id,
                        TransactionId = transaction.Id
                    };
                    await _dbContext.CustomerVouchers.AddAsync(newCustomerVoucher);
                }
                else
                {
                    customerVoucher.TransactionId = transaction.Id;
                }

                transaction.VoucherId = voucher.Id;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error processing voucher for transaction: {data.reference}");
                throw new ServiceException(ex.Message);
            }
        }
//process wallet deposit
        public async Task<object> ProcessWalletDeposit(PaystackVerificationData data)
        {
            try
            {
                var transaction = new Transaction
                {
                    Status = data.status,
                    StatusBool = true,
                    AmountPaid = (double)data.amount! / 100,
                    TransactionRef = data.reference,
                    PaymentId = (BigInteger)data.id,
                    TotalAmount = data.metadata!.amount,
                    PaidAt = data.paid_at,
                    PaymentChannel = data.channel,
                    Type = "Deposit",
                    WalletId = data.metadata.walletId
                };

                var CurrentDepsit = await _dbContext.Deposites.Where(d => d.ReferenceId == data.reference).FirstOrDefaultAsync();
                if (CurrentDepsit is null)
                {
                    var deposit = new Deposite
                    {
                        Status = data.status,
                        Type = "Deposit",
                        TransactionId = (BigInteger)data.id,
                        Amount = (double)data.amount / 100,
                        ReferenceId = data.reference,
                        WalletId = (int)data.metadata.walletId!,
                        CreatedAt = data.paid_at ?? DateTime.UtcNow,
                        UpdatedAt = data.paid_at ?? DateTime.UtcNow,
                        PaymentMethod = data.channel
                    };

                    var wallet = await _dbContext.Wallets.FindAsync(data.metadata.walletId);
                    if (wallet == null)
                    {
                        _logger.LogError($"Wallet not found for deposit: {data.reference}");
                        throw new ServiceException("Wallet not found");
                    }

                    wallet.InitialBalance = wallet.Balance;
                    wallet.Balance += deposit.Amount;
                    wallet.UpdatedAt = DateTime.UtcNow;

                    await _dbContext.Deposites.AddAsync(deposit);
                    await _dbContext.Transactions.AddAsync(transaction);
                    _dbContext.Wallets.Update(wallet);
                    await _dbContext.SaveChangesAsync();

                }
                else
                {

                    CurrentDepsit.Status = data.status;
                    CurrentDepsit.TransactionId = (BigInteger)data.id;
                    CurrentDepsit.UpdatedAt = data.paid_at ?? DateTime.UtcNow;
                    CurrentDepsit.PaymentMethod = data.channel;


                    var wallet = await _dbContext.Wallets.FindAsync(data.metadata.walletId);
                    if (wallet == null)
                    {
                        _logger.LogError($"Wallet not found for deposit: {data.reference}");
                        throw new ServiceException("Wallet not found");
                    }

                    wallet.InitialBalance = wallet.Balance;
                    wallet.Balance += CurrentDepsit.Amount;
                    wallet.UpdatedAt = DateTime.UtcNow;

                    _dbContext.Deposites.Update(CurrentDepsit);
                    await _dbContext.Transactions.AddAsync(transaction);
                    _dbContext.Wallets.Update(wallet);
                    await _dbContext.SaveChangesAsync();
                }

                _logger.LogInformation($"Processed wallet deposit: {data.reference}");
                return transaction;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error processing wallet deposit: {data.reference}");
                throw;
            }
        }

    }
}
