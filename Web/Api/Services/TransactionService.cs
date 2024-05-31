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

namespace Api.Services
{
    public class TransactionService : ITransaction
    {
        private readonly DBContext _dbContext;
        private readonly IMapper _mapper;
        private readonly IConfiguration _config;
        private readonly IHttpClientFactory _ClientFactory;
        private readonly IVoucher _ivoucher;
        public TransactionService(DBContext dbContext, IMapper mapper, IConfiguration config, IHttpClientFactory clientFactory, IVoucher ivoucher)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _config = config;
            _ClientFactory = clientFactory;
            _ivoucher = ivoucher;
        }

        public async Task<IEnumerable<TransactionDTO>> allAsync()
        {
            try
            {
                var transactions = await _dbContext.Transactions
                    .Include(t => t.Order)
                    .ThenInclude(o => o!.Customer)
                    .OrderByDescending(t => t.CreatedAt)
                    .ToListAsync();
                var transactionDTO = _mapper.Map<List<TransactionDTO>>(transactions);
                return transactionDTO;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<PaymentDetailsDTO> confirmPayment(string status, string tx_ref, string transaction_id)
        {
            try
            {
                //this is the uri
                var request = new HttpRequestMessage(HttpMethod.Get,
                $"https://api.flutterwave.com/v3/transactions/{transaction_id}/verify");
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
                    var paymentRes = JsonConvert.DeserializeObject<PaymentDetailsDTO>(apiString);

                    if (paymentRes!.Status == "success")
                    {
                        var transaction = new Transaction();
                        transaction.Status = paymentRes.Status;
                        transaction.AmountPaid = paymentRes.Data!.Amount;
                        transaction.TransactionRef = paymentRes.Data!.Tx_ref;
                        transaction.PaymentId = (BigInteger)paymentRes.Data!.Id!;
                        transaction.TotalAmount = paymentRes.Data!.Meta!.totalAmount;
                        transaction.OrderId = (int)paymentRes.Data!.Meta.orderId!;
                        var voucher = await _ivoucher.searchWithCode(paymentRes.Data!.Meta.voucherCode!);
                        transaction.VoucherId = voucher.Id;

                        await _dbContext.Transactions.AddAsync(transaction);
                        await _dbContext.SaveChangesAsync();

                        return paymentRes;
                    }
                    throw new Exception(paymentRes.Status);
                }
                throw new Exception("Response not Ok");
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public Task<TransactionDTO> createAsync(TransactionDTO transaction)
        {
            throw new NotImplementedException();
        }

        public async Task<string> deleteAsync(int id)
        {
            try
            {
                var transaction = await _dbContext.Transactions
                    .FirstOrDefaultAsync(t => t.Id == id);
                if (transaction == null) throw new Exception("Transaction not found");
                _dbContext.Transactions.Remove(transaction);
                await _dbContext.SaveChangesAsync();
                return "Transaction deleted";
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<TransactionDTO> getAsync(int id)
        {
            try
            {
                var transaction = await _dbContext.Transactions
                    .Include(t => t.Order)
                    .ThenInclude(o => o!.Customer)
                    .FirstOrDefaultAsync(t => t.Id == id);
                if (transaction == null) throw new Exception("Transaction not found");
                var transactionDTO = _mapper.Map<TransactionDTO>(transaction);
                return transactionDTO;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<TransactionDTO> getByPaymentId(BigInteger transactionId)
        {
            try
            {
                var transaction = await _dbContext.Transactions
                    .Include(t => t.Order)
                    .ThenInclude(o => o!.Customer)
                    .FirstOrDefaultAsync(t => t.PaymentId == transactionId);
                if (transaction == null) throw new Exception("Transaction not found");
                var transactionDTO = _mapper.Map<TransactionDTO>(transaction);
                return transactionDTO;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<DTO.Data> initiatePayment(InitiatePaymentDTO initiatePayment)
        {
            try
            {
                var payment = await _dbContext.Transactions.FirstOrDefaultAsync(t => t.OrderId == initiatePayment.OrderId);
                if (payment != null)
                {
                    throw new Exception("Already paid for this order");
                }
                var order = await _dbContext.Orders.Include(o => o.Customer).FirstOrDefaultAsync(o => o.Id == initiatePayment.OrderId);
                if (order == null) throw new Exception("Order not found");
                var tx_ref = GenerateTxRef.genTx_rf();
                string redirectUrl = _config["Base_Url:Local"] + "/transaction/confirmPayment";
                DTO.Customer customer = new DTO.Customer();
                customer.email = order.Customer!.Email;
                customer.phone_number = order.Customer.PhoneNumber;
                customer.name = order.Customer.FirstName;
                Customizations customizations = new Customizations();
                customizations.title = "LifePadi";
                customizations.description = "Service payment";
                customizations.logo = "https://res.cloudinary.com/dkk8x5qzl/image/upload/v1704877092/logo/e4et2rgmldcyq8hasmvj.jpg";

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
                    Console.WriteLine(paymentRes);
                    if (paymentRes!.status == "success")
                    {
                        return new DTO.Data
                        {
                            link = paymentRes.data!.link
                        };
                    }
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

        public Task<TransactionDTO> updateAsync(TransactionDTO transaction, int id)
        {
            throw new NotImplementedException();
        }
    }
}
