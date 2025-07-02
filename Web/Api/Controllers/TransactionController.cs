using Api.DTO;
using Api.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Api.Exceptions;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TransactionController : ControllerBase
    {
        private readonly ITransaction _itran;
        private readonly ILogger<TransactionController> _logger;
        public TransactionController(ITransaction itran, ILogger<TransactionController> logger)
        {
            _itran = itran;
            _logger = logger;
        }

        [HttpPost("initiate")]
        public async Task<IActionResult> initiatePayment([FromBody] InitiatePaymentDto initiatePayment)
        {
            using var scope = _logger.BeginScope(new Dictionary<string, object>
            {
                ["Action"] = nameof(initiatePayment),
                ["Amount"] = initiatePayment?.Amount ?? 0,
                ["OrderId"] = initiatePayment?.OrderId ?? 0
            });

            _logger.LogInformation("Initiating payment");

            if (initiatePayment == null)
            {
                _logger.LogWarning("Payment initiation request with null data");
                throw new ValidationException("Payment data is required");
            }

            var response = await _itran.InitiatePayment(initiatePayment);

            _logger.LogInformation("Payment initiation completed for OrderId: {OrderId}", initiatePayment.OrderId);
            return Ok(ApiResponse<object>.CreateSuccess(response, "Payment initiated successfully"));
        }



        [HttpGet("confirmPayment")]
        public async Task<IActionResult> confirmPayment([FromQuery] AfterPayment transactionInfo)
        {
            using var scope = _logger.BeginScope(new Dictionary<string, object>
            {
                ["Action"] = nameof(confirmPayment),
                ["TransactionRef"] = transactionInfo?.tx_ref ?? "N/A"
            });

            _logger.LogInformation("Confirming payment");

            if (transactionInfo == null)
            {
                _logger.LogWarning("Payment confirmation request with null data");
                throw new ValidationException("Transaction info is required");
            }

            var response = await _itran.ConfirmPayment(transactionInfo);

            _logger.LogInformation("Payment confirmation completed for reference: {TransactionRef}", transactionInfo.tx_ref);
            return Ok(ApiResponse<object>.CreateSuccess(response, "Payment confirmed successfully"));
        }

        [HttpGet("all")]
        public async Task<IActionResult> all()
        {
            using var scope = _logger.BeginScope(new Dictionary<string, object>
            {
                ["Action"] = nameof(all)
            });

            _logger.LogInformation("Retrieving all transactions");

            var response = await _itran.AllAsync();

            _logger.LogInformation("Retrieved {Count} transactions", response?.Count() ?? 0);
            return Ok(ApiResponse<object>.CreateSuccess(response ?? Enumerable.Empty<object>(), "Transactions retrieved successfully"));
        }

        [HttpGet("get/{id}")]
        public async Task<IActionResult> get(int id)
        {
            using var scope = _logger.BeginScope(new Dictionary<string, object>
            {
                ["Action"] = nameof(get),
                ["TransactionId"] = id
            });

            _logger.LogInformation("Retrieving transaction: {TransactionId}", id);

            if (id <= 0)
            {
                _logger.LogWarning("Invalid transaction ID provided: {TransactionId}", id);
                throw new ValidationException("Valid transaction ID is required");
            }

            var response = await _itran.GetAsync(id);
            if (response == null)
            {
                _logger.LogWarning("Transaction not found: {TransactionId}", id);
                throw new ResourceNotFoundException("Transaction", id);
            }

            _logger.LogInformation("Transaction retrieved successfully: {TransactionId}", id);
            return Ok(ApiResponse<object>.CreateSuccess(response, "Transaction retrieved successfully"));
        }

        [HttpGet("getByReference")]
        public async Task<IActionResult> get([FromQuery] string reference)
        {
            using var scope = _logger.BeginScope(new Dictionary<string, object>
            {
                ["Action"] = "GetByReference",
                ["Reference"] = reference ?? "N/A"
            });

            _logger.LogInformation("Retrieving transaction by reference: {Reference}", reference);

            if (string.IsNullOrWhiteSpace(reference))
            {
                _logger.LogWarning("Empty reference provided for transaction lookup");
                throw new ValidationException("Transaction reference is required");
            }

            var response = await _itran.GetByReference(reference);
            if (response == null)
            {
                _logger.LogWarning("Transaction not found by reference: {Reference}", reference);
                throw new ResourceNotFoundException($"Transaction with reference '{reference}' not found");
            }

            _logger.LogInformation("Transaction retrieved successfully by reference: {Reference}", reference);
            return Ok(ApiResponse<object>.CreateSuccess(response, "Transaction retrieved successfully"));
        }

        [HttpPost("BaniCheckout")]
        public async Task<IActionResult> baniCheckout([FromBody] InitiatePaymentDto initiatePaymentDto)
        {
            using var scope = _logger.BeginScope(new Dictionary<string, object>
            {
                ["Action"] = nameof(baniCheckout),
                ["Amount"] = initiatePaymentDto?.Amount ?? 0,
                ["OrderId"] = initiatePaymentDto?.OrderId ?? 0
            });

            _logger.LogInformation("Processing Bani checkout");

            if (initiatePaymentDto == null)
            {
                _logger.LogWarning("Bani checkout request with null data");
                throw new ValidationException("Payment data is required");
            }

            var response = await _itran.BaniCheckout(initiatePaymentDto);

            _logger.LogInformation("Bani checkout completed for OrderId: {OrderId}", initiatePaymentDto.OrderId);
            return Ok(ApiResponse<object>.CreateSuccess(response, "Bani checkout completed successfully"));
        }

        [HttpPost("PaystackCheckout")]
        public async Task<IActionResult> paystackCheckout([FromBody] InitiatePaymentDto initiatePaymentDto)
        {
            using var scope = _logger.BeginScope(new Dictionary<string, object>
            {
                ["Action"] = nameof(paystackCheckout),
                ["Amount"] = initiatePaymentDto?.Amount ?? 0,
                ["OrderId"] = initiatePaymentDto?.OrderId ?? 0
            });

            _logger.LogInformation("Processing Paystack checkout");

            if (initiatePaymentDto == null)
            {
                _logger.LogWarning("Paystack checkout request with null data");
                throw new ValidationException("Payment data is required");
            }

            var response = await _itran.PaystackCheckout(initiatePaymentDto);

            _logger.LogInformation("Paystack checkout completed for OrderId: {OrderId}", initiatePaymentDto.OrderId);
            return Ok(ApiResponse<object>.CreateSuccess(response, "Paystack checkout completed successfully"));
        }

        [HttpPost("MobilePaystackCheckout")]
        public async Task<IActionResult> mobilePaystackCheckout([FromBody] InitiatePaymentDto initiatePaymentDto)
        {
            using var scope = _logger.BeginScope(new Dictionary<string, object>
            {
                ["Action"] = nameof(mobilePaystackCheckout),
                ["Amount"] = initiatePaymentDto?.Amount ?? 0,
                ["OrderId"] = initiatePaymentDto?.OrderId ?? 0
            });

            _logger.LogInformation("Processing mobile Paystack checkout");

            if (initiatePaymentDto == null)
            {
                _logger.LogWarning("Mobile Paystack checkout request with null data");
                throw new ValidationException("Payment data is required");
            }

            var response = await _itran.MobilePaystackCheckout(initiatePaymentDto);

            _logger.LogInformation("Mobile Paystack checkout completed for OrderId: {OrderId}", initiatePaymentDto.OrderId);
            return Ok(ApiResponse<object>.CreateSuccess(response, "Mobile Paystack checkout completed successfully"));
        }

        [HttpGet("paystack-confirmPayment")]
        public async Task<IActionResult> paystackVerifyPayment([FromQuery] string reference)
        {
            using var scope = _logger.BeginScope(new Dictionary<string, object>
            {
                ["Action"] = nameof(paystackVerifyPayment),
                ["Reference"] = reference ?? "N/A"
            });

            _logger.LogInformation("Verifying Paystack payment: {Reference}", reference);

            if (string.IsNullOrWhiteSpace(reference))
            {
                _logger.LogWarning("Empty reference provided for Paystack payment verification");
                throw new ValidationException("Payment reference is required");
            }

            var response = await _itran.PaystackVerifyPayment(reference);

            _logger.LogInformation("Paystack payment verification completed for reference: {Reference}", reference);
            return Ok(ApiResponse<object>.CreateSuccess(response, "Payment verification completed successfully"));
        }


        [HttpGet("transactionByOrderId/{orderId}")]
        public async Task<IActionResult> transactionByOrderId(int orderId)
        {
            using var scope = _logger.BeginScope(new Dictionary<string, object>
            {
                ["Action"] = nameof(transactionByOrderId),
                ["OrderId"] = orderId
            });

            _logger.LogInformation("Retrieving transaction by order ID: {OrderId}", orderId);

            if (orderId <= 0)
            {
                _logger.LogWarning("Invalid order ID provided for transaction lookup: {OrderId}", orderId);
                throw new ValidationException("Valid order ID is required");
            }

            var response = await _itran.GetTransactionByOrderId(orderId);
            if (response == null)
            {
                _logger.LogWarning("Transaction not found for order ID: {OrderId}", orderId);
                throw new ResourceNotFoundException($"Transaction for order {orderId} not found");
            }

            _logger.LogInformation("Transaction retrieved successfully for order ID: {OrderId}", orderId);
            return Ok(ApiResponse<object>.CreateSuccess(response, "Transaction retrieved successfully"));
        }
    }
}
