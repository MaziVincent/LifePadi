using Api.DTO;
using Api.Helpers;
using Api.Interfaces;
using Api.Models;
using AutoMapper;
using Bogus.DataSets;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System.Net.Http.Headers;
using System.Numerics;
using System.Text;
<<<<<<< HEAD
using System.Threading.Tasks;
using System.Net.Http;
=======
>>>>>>> 7f9ad44 (done with payment and voucher)

namespace Api.Services
{
    public class TransactionService : ITransaction
    {
        private readonly DBContext _dbContext;
        private readonly IMapper _mapper;
        private readonly IConfiguration _config;
        private readonly IHttpClientFactory _ClientFactory;
        private readonly IVoucher _ivoucher;
<<<<<<< HEAD
        private readonly HttpClient _httpClient;
        public TransactionService(DBContext dbContext, IMapper mapper, IConfiguration config, IHttpClientFactory clientFactory, IVoucher ivoucher, HttpClient httpClient)
=======
        public TransactionService(DBContext dbContext, IMapper mapper, IConfiguration config, IHttpClientFactory clientFactory, IVoucher ivoucher)
>>>>>>> 7f9ad44 (done with payment and voucher)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _config = config;
            _ClientFactory = clientFactory;
            _ivoucher = ivoucher;
<<<<<<< HEAD
            _httpClient = httpClient;
        }

        public async Task<IEnumerable<TransactionDto>> AllAsync()
=======
        }

<<<<<<< HEAD
        public async Task<IEnumerable<TransactionDTO>> allAsync()
>>>>>>> 7f9ad44 (done with payment and voucher)
=======
        public async Task<IEnumerable<TransactionDto>> allAsync()
>>>>>>> 836ec36 (changed all DTO to Dto)
        {
            try
            {
                var transactions = await _dbContext.Transactions
                    .Include(t => t.Order)
                    .ThenInclude(o => o!.Customer)
                    .OrderByDescending(t => t.CreatedAt)
                    .ToListAsync();
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
                var transactionDTO = _mapper.Map<List<TransactionDTO>>(transactions);
=======
                var transactionDTO = _mapper.Map<List<TransactionDto>>(transactions);
>>>>>>> 836ec36 (changed all DTO to Dto)
                return transactionDTO;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<PaymentDetailsDto> confirmPayment(string status, string tx_ref, string transaction_id)
        {
            try
            {
                //this is the uri
                var request = new HttpRequestMessage(HttpMethod.Get,
                $"https://api.flutterwave.com/v3/transactions/{transaction_id}/verify");
>>>>>>> 7f9ad44 (done with payment and voucher)
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
<<<<<<< HEAD
<<<<<<< HEAD
                    var paymentRes = JsonConvert.DeserializeObject<PaymentDetailsDto>(apiString);
=======
                    var paymentRes = JsonConvert.DeserializeObject<PaymentDetailsDTO>(apiString);
>>>>>>> 7f9ad44 (done with payment and voucher)
=======
                    var paymentRes = JsonConvert.DeserializeObject<PaymentDetailsDto>(apiString);
>>>>>>> 836ec36 (changed all DTO to Dto)

                    if (paymentRes!.Status == "success")
                    {
                        var transaction = new Transaction();
                        transaction.Status = paymentRes.Status;
                        transaction.AmountPaid = paymentRes.Data!.Amount;
                        transaction.TransactionRef = paymentRes.Data!.Tx_ref;
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
                        transaction.PaymentId = (BigInteger) paymentRes.Data!.Id!;
=======
                        transaction.PaymentId = (BigInteger)paymentRes.Data!.Id!;
>>>>>>> 98415b4 (done with dashboard)
                        transaction.TotalAmount = paymentRes.Data!.Meta!.totalAmount;
                        transaction.OrderId = (int)paymentRes.Data!.Meta.orderId!;
                        var voucher = await _ivoucher.searchWithCode(paymentRes.Data!.Meta.voucherCode!);
                        transaction.VoucherId = voucher.Id;
>>>>>>> 7f9ad44 (done with payment and voucher)

                        await _dbContext.Transactions.AddAsync(transaction);
                        await _dbContext.SaveChangesAsync();

                        return paymentRes;
                    }
<<<<<<< HEAD
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
=======
                    throw new Exception(paymentRes.Status);
                }
                throw new Exception("Response not Ok");
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

<<<<<<< HEAD
        public Task<TransactionDTO> createAsync(TransactionDTO transaction)
>>>>>>> 7f9ad44 (done with payment and voucher)
=======
        public Task<TransactionDto> createAsync(TransactionDto transaction)
>>>>>>> 836ec36 (changed all DTO to Dto)
        {
            throw new NotImplementedException();
        }

<<<<<<< HEAD
        public async Task<string> DeleteAsync(int id)
=======
        public async Task<string> deleteAsync(int id)
>>>>>>> 7f9ad44 (done with payment and voucher)
        {
            try
            {
                var transaction = await _dbContext.Transactions
                    .FirstOrDefaultAsync(t => t.Id == id);
<<<<<<< HEAD
                if (transaction == null) throw new Exceptions.ServiceException("Transaction not found");
=======
                if (transaction == null) throw new Exception("Transaction not found");
>>>>>>> 7f9ad44 (done with payment and voucher)
                _dbContext.Transactions.Remove(transaction);
                await _dbContext.SaveChangesAsync();
                return "Transaction deleted";
            }
            catch (Exception ex)
            {
<<<<<<< HEAD
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<TransactionDto> GetAsync(int id)
=======
                throw new Exception(ex.Message);
            }
        }

<<<<<<< HEAD
        public async Task<TransactionDTO> getAsync(int id)
>>>>>>> 7f9ad44 (done with payment and voucher)
=======
        public async Task<TransactionDto> getAsync(int id)
>>>>>>> 836ec36 (changed all DTO to Dto)
        {
            try
            {
                var transaction = await _dbContext.Transactions
                    .Include(t => t.Order)
                    .ThenInclude(o => o!.Customer)
                    .FirstOrDefaultAsync(t => t.Id == id);
<<<<<<< HEAD
                if (transaction == null) throw new Exceptions.ServiceException("Transaction not found");
                var transactionDTO = _mapper.Map<TransactionDto>(transaction);
                return transactionDTO;
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<TransactionDto> GetByPaymentId(BigInteger transactionId)
=======
                if (transaction == null) throw new Exception("Transaction not found");
                var transactionDTO = _mapper.Map<TransactionDto>(transaction);
                return transactionDTO;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

<<<<<<< HEAD
        public async Task<TransactionDTO> getByPaymentId(BigInteger transactionId)
>>>>>>> 7f9ad44 (done with payment and voucher)
=======
        public async Task<TransactionDto> getByPaymentId(BigInteger transactionId)
>>>>>>> 836ec36 (changed all DTO to Dto)
        {
            try
            {
                var transaction = await _dbContext.Transactions
                    .Include(t => t.Order)
                    .ThenInclude(o => o!.Customer)
                    .FirstOrDefaultAsync(t => t.PaymentId == transactionId);
<<<<<<< HEAD
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
=======
                if (transaction == null) throw new Exception("Transaction not found");
                var transactionDTO = _mapper.Map<TransactionDto>(transaction);
                return transactionDTO;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

<<<<<<< HEAD
        public async Task<DTO.Data> initiatePayment(InitiatePaymentDTO initiatePayment)
>>>>>>> 7f9ad44 (done with payment and voucher)
=======
        public async Task<DTO.Data> initiatePayment(InitiatePaymentDto initiatePayment)
>>>>>>> 836ec36 (changed all DTO to Dto)
        {
            try
            {
                var payment = await _dbContext.Transactions.FirstOrDefaultAsync(t => t.OrderId == initiatePayment.OrderId);
<<<<<<< HEAD
<<<<<<< HEAD
                if (payment != null)
                {
                    throw new Exceptions.ServiceException("Already paid for this order");
                }
                var order = await _dbContext.Orders.Include(o => o.Customer).FirstOrDefaultAsync(o => o.Id == initiatePayment.OrderId);
                if (order == null) throw new Exceptions.ServiceException("Order not found");
                var tx_ref = GenerateTxRef.genTx_rf();
                // string redirectUrl = _config["Base_Url:Local"] + "/transaction/confirmPayment";
                string redirectUrl = _config["Base_Url:Frontend_remote"] + "/shop/payment-response";
                Customer_Info customer = new Customer_Info();
=======
                if(payment != null)
=======
                if (payment != null)
>>>>>>> 98415b4 (done with dashboard)
                {
                    throw new Exception("Already paid for this order");
                }
                var order = await _dbContext.Orders.Include(o => o.Customer).FirstOrDefaultAsync(o => o.Id == initiatePayment.OrderId);
                if (order == null) throw new Exception("Order not found");
                var tx_ref = GenerateTxRef.genTx_rf();
                string redirectUrl = _config["Base_Url:Local"] + "/transaction/confirmPayment";
                DTO.Customer customer = new DTO.Customer();
>>>>>>> 7f9ad44 (done with payment and voucher)
                customer.email = order.Customer!.Email;
                customer.phone_number = order.Customer.PhoneNumber;
                customer.name = order.Customer.FirstName;
                Customizations customizations = new Customizations();
                customizations.title = "LifePadi";
                customizations.description = "Service payment";
<<<<<<< HEAD
                customizations.logo = "https://res.cloudinary.com/dbxapeqzu/image/upload/v1724785015/LifePadi/logo/Logo_dark_ndhilz.svg";
=======
                customizations.logo = "https://res.cloudinary.com/dkk8x5qzl/image/upload/v1704877092/logo/e4et2rgmldcyq8hasmvj.jpg";
>>>>>>> 7f9ad44 (done with payment and voucher)

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
<<<<<<< HEAD
                    // Console.WriteLine(paymentRes);
=======
                    Console.WriteLine(paymentRes);
>>>>>>> 7f9ad44 (done with payment and voucher)
                    if (paymentRes!.status == "success")
                    {
                        return new DTO.Data
                        {
                            link = paymentRes.data!.link
                        };
                    }
<<<<<<< HEAD
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
                    createdAt = DateTime.UtcNow
                };
                var tx_ref = GenerateTxRef.genTx_rf();
                // var redirect_url = _config["Base_Url:Frontend_remote"] + "/shop/payment-response";
                var redirect_url = _config["Base_Url:Remote_GCP"] + "/transaction/paystack-confirmPayment";
                string paymentUrl = _config["Paystack:Initialize_Payment_Url"]!;
                var payload = new
                {
                    email = order.Customer!.Email,
                    amount = Math.Round(initiatePaymentDto.TotalAmount * 100, 1),
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
                request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", _config["Paystack:Test_Key"]);

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
                var redirect_url = _config["Base_Url:Frontend_remote"] + "/shop/payment-response";
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
                request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", _config["Paystack:Secret_key"]);

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
                    };
                }

                string paymentUrl = _config["Paystack:Verify_Payment_Url"] + "/" + reference;
                var request = new HttpRequestMessage(HttpMethod.Get, paymentUrl);
                var client = _ClientFactory.CreateClient();
                request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", _config["Paystack:Test_Key"]);
                HttpResponseMessage response = await client.SendAsync(request, HttpCompletionOption.ResponseHeadersRead);
                if (response.StatusCode == System.Net.HttpStatusCode.OK)
                {
                    var apiString = await response.Content.ReadAsStringAsync();
                    var paymentRes = JsonConvert.DeserializeObject<PaystackVerificationResponse>(apiString);

                    //insert transaction into the database
                    var transaction = new Transaction();
                    transaction.Status = paymentRes!.data!.status;
                    transaction.StatusBool = paymentRes!.status;
                    transaction.AmountPaid = (Double)paymentRes.data!.amount! / 100;
                    transaction.TransactionRef = reference;
                    transaction.PaymentId = (BigInteger)paymentRes.data!.id!;
                    transaction.TotalAmount = paymentRes.data!.metadata!.totalAmount;
                    transaction.OrderId = (int)paymentRes.data!.metadata!.orderId!;
                    transaction.DeliveryFee = paymentRes.data!.metadata!.deliveryFee;
                    transaction.PaidAt = paymentRes.data!.paid_at;
                    transaction.PaymentChannel = paymentRes.data!.channel;
                    transaction.SubTotal = paymentRes.data!.metadata!.amount;
                    transaction.Type = "Payment";
                    if (paymentRes.data.metadata.voucherCode != "")
                    {
                        var voucher = await _ivoucher.searchWithCode(paymentRes.data!.metadata.voucherCode!);
                        var dorder = await _dbContext.Orders.FirstOrDefaultAsync(o => o.Id == transaction.OrderId);
                        var customerVoucher = await _dbContext.CustomerVouchers.FirstOrDefaultAsync(cv => cv.CustomerId == dorder!.CustomerId && cv.VoucherId == voucher.Id);
                        if (customerVoucher == null)
                        {
                            var newCustomerVoucher = new CustomerVoucher
                            {
                                CustomerId = dorder!.CustomerId,
                                VoucherId = voucher.Id,
                                TransactionId = transaction.Id
                            };
                            await _dbContext.CustomerVouchers.AddAsync(newCustomerVoucher);
                        }
                        else
                        {
                            customerVoucher.TransactionId = transaction.Id;
                        }
                        await _dbContext.SaveChangesAsync();
                        transaction.VoucherId = voucher.Id;
                    }

                    //update order status to ongoing
                    var order = await _dbContext.Orders.FirstOrDefaultAsync(o => o.Id == (int)paymentRes!.data!.metadata!.orderId!);
                    if (order == null) throw new Exceptions.ServiceException("Order not found");
                    order.Status = "Ongoing";
                    order.PaymentChannel = paymentRes.data!.channel;
                    order.SearchString = order.Status.ToUpper() + " " + order.Type!.ToUpper() + " " + order.Order_Id;
                    // await _dbContext.SaveChangesAsync();

                    await _dbContext.Transactions.AddAsync(transaction);
                    await _dbContext.SaveChangesAsync();

                    return transaction!;
                }
                throw new Exceptions.ServiceException(response.ReasonPhrase!.ToString());
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
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
=======
                    throw new Exception("Payment not successful");
                }
                throw new Exception(response.StatusCode.ToString());

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<int> totalNumberOfFailedTransactions()
        {
            try
            {
                var transactions = await _dbContext.Transactions.Where(t => t.Status == "failed").CountAsync();
                return transactions;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<int> totalNumberOfPendingTransactions()
        {
            try
            {
                var transactions = await _dbContext.Transactions.Where(t => t.Status == "pending").CountAsync();
                return transactions;
            }catch(Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<int> totalNumberOfSuccessfulTransactions()
        {
            try
            {
                var transactions = await _dbContext.Transactions.Where(t => t.Status == "success").CountAsync();
                return transactions;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<int> totalNumberOfTransactions()
        {
            try
            {
                var transactions = await _dbContext.Transactions.CountAsync();
                return transactions;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<object> transactionStats()
        {
            try
            {
                var stats = new
                {
                    totalNumberOfTransactions = await totalNumberOfTransactions(),
                    totalNumberOfSuccessfulTransactions = await totalNumberOfSuccessfulTransactions(),
                    totalNumberOfFailedTransactions = await totalNumberOfFailedTransactions(),
                    totalNumberOfPendingTransactions = await totalNumberOfPendingTransactions()
                };
                return stats;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

<<<<<<< HEAD
        public Task<TransactionDTO> updateAsync(TransactionDTO transaction, int id)
>>>>>>> 7f9ad44 (done with payment and voucher)
=======
        public Task<TransactionDto> updateAsync(TransactionDto transaction, int id)
>>>>>>> 836ec36 (changed all DTO to Dto)
        {
            throw new NotImplementedException();
        }
    }
}
