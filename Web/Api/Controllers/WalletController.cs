using System;
using System.Collections.Generic;
using System.Linq;
using System.Numerics;
using System.Threading.Tasks;
using Api.DTO;
using Api.Interfaces;
using Api.Authorization;
using Api.Exceptions;
using Api.Middleware;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize] // All wallet operations require authentication
    public class WalletController : ControllerBase
    {
        private readonly IWallet _wallet;
        private readonly IMapper _mapper;
        private readonly ILogger<WalletController> _logger;

        public WalletController(IWallet wallet, IMapper mapper, ILogger<WalletController> logger)
        {
            _wallet = wallet;
            _mapper = mapper;
            _logger = logger;
        }

        [HttpGet("balance/{id}")]
        [ResourceOwnerOrAdmin("id")]
        public async Task<ActionResult<ApiResponse<object>>> GetBalance(int id)
        {
            if (id <= 0)
            {
                return BadRequest(ApiResponse<object>.CreateError("Invalid wallet ID", "INVALID_WALLET_ID"));
            }

            var correlationId = HttpContext.GetCorrelationId();
            _logger.LogInformation("Getting wallet balance for ID: {WalletId} - CorrelationId: {CorrelationId}", id, correlationId);

            var response = await _wallet.getBalance(id);
            return Ok(ApiResponse<object>.CreateSuccess(response, "Wallet balance retrieved successfully"));
        }

        [HttpGet("all")]
        [Authorize(Policy = "AdminOnly")] // Only admins can view all wallets
        public async Task<ActionResult<ApiResponse<object>>> GetAll()
        {
            var correlationId = HttpContext.GetCorrelationId();
            _logger.LogInformation("Getting all wallets - CorrelationId: {CorrelationId}", correlationId);

            var wallets = await _wallet.getAllAsync();
            return Ok(ApiResponse<object>.CreateSuccess(wallets, "All wallets retrieved successfully"));
        }

        [HttpGet("get/{id}")]
        public async Task<ActionResult<ApiResponse<object>>> Get(int id)
        {
            if (id <= 0)
            {
                return BadRequest(ApiResponse<object>.CreateError("Invalid wallet ID", "INVALID_WALLET_ID"));
            }

            var correlationId = HttpContext.GetCorrelationId();
            _logger.LogInformation("Getting wallet for ID: {WalletId} - CorrelationId: {CorrelationId}", id, correlationId);

            var wallet = await _wallet.getAsync(id);

            if (wallet == null)
            {
                return NotFound(ApiResponse<object>.CreateNotFound($"Wallet with ID {id} not found"));
            }

            return Ok(ApiResponse<object>.CreateSuccess(wallet, "Wallet retrieved successfully"));
        }

        [HttpGet("stats/{id}")]
        public async Task<ActionResult<ApiResponse<object>>> GetWalletStats(int id)
        {
            if (id <= 0)
            {
                return BadRequest(ApiResponse<object>.CreateError("Invalid customer ID", "INVALID_CUSTOMER_ID"));
            }

            var correlationId = HttpContext.GetCorrelationId();
            _logger.LogInformation("Getting wallet stats for customer ID: {CustomerId} - CorrelationId: {CorrelationId}", id, correlationId);

            var stats = await _wallet.getCustomerWalletStat(id);

            if (stats == null)
            {
                return NotFound(ApiResponse<object>.CreateNotFound($"Wallet stats for customer ID {id} not found"));
            }

            return Ok(ApiResponse<object>.CreateSuccess(stats, "Wallet statistics retrieved successfully"));
        }

        [HttpGet("initial-balance/{id}")]
        public async Task<ActionResult<ApiResponse<object>>> GetInitialBalance(int id)
        {
            if (id <= 0)
            {
                return BadRequest(ApiResponse<object>.CreateError("Invalid wallet ID", "INVALID_WALLET_ID"));
            }

            var correlationId = HttpContext.GetCorrelationId();
            _logger.LogInformation("Getting initial balance for wallet ID: {WalletId} - CorrelationId: {CorrelationId}", id, correlationId);

            var balance = await _wallet.getInitialBalance(id);
            return Ok(ApiResponse<object>.CreateSuccess(balance, "Initial balance retrieved successfully"));
        }

        [HttpGet("customer/{customerId}")]
        public async Task<ActionResult<ApiResponse<object>>> GetCustomerWallet(int customerId)
        {
            if (customerId <= 0)
            {
                return BadRequest(ApiResponse<object>.CreateError("Invalid customer ID", "INVALID_CUSTOMER_ID"));
            }

            var correlationId = HttpContext.GetCorrelationId();
            _logger.LogInformation("Getting wallet for customer ID: {CustomerId} - CorrelationId: {CorrelationId}", customerId, correlationId);

            var wallet = await _wallet.getWalletByCustomerId(customerId);

            if (wallet == null)
            {
                return NotFound(ApiResponse<object>.CreateNotFound($"Wallet for customer ID {customerId} not found"));
            }

            return Ok(ApiResponse<object>.CreateSuccess(wallet, "Customer wallet retrieved successfully"));
        }

        [HttpPost("create")]
        [Authorize(Policy = "AdminOnly")] // Only admins can create wallets
        [AuditLog("Create Wallet")]
        public async Task<ActionResult<ApiResponse<object>>> Create([FromBody] WalletDto wallet)
        {
            if (!ModelState.IsValid)
            {
                var validationErrors = ModelState
                    .Where(x => x.Value?.Errors.Count > 0)
                    .ToDictionary(
                        kvp => kvp.Key,
                        kvp => kvp.Value?.Errors.Select(e => e.ErrorMessage).ToArray() ?? Array.Empty<string>()
                    );

                return BadRequest(ApiResponse<object>.CreateValidationError(validationErrors));
            }

            if (wallet == null)
            {
                return BadRequest(ApiResponse<object>.CreateError("Wallet data is required", "MISSING_WALLET_DATA"));
            }

            var correlationId = HttpContext.GetCorrelationId();
            _logger.LogInformation("Creating new wallet for customer ID: {CustomerId} - CorrelationId: {CorrelationId}",
                wallet.CustomerId, correlationId);

            var response = await _wallet.createAsync(wallet);
            return Ok(ApiResponse<object>.CreateSuccess(response, "Wallet created successfully"));
        }

        [HttpPut("update/{id}")]
        public async Task<ActionResult<ApiResponse<object>>> Update(int id, [FromBody] WalletDto wallet)
        {
            if (id <= 0)
            {
                return BadRequest(ApiResponse<object>.CreateError("Invalid wallet ID", "INVALID_WALLET_ID"));
            }

            if (!ModelState.IsValid)
            {
                var validationErrors = ModelState
                    .Where(x => x.Value?.Errors.Count > 0)
                    .ToDictionary(
                        kvp => kvp.Key,
                        kvp => kvp.Value?.Errors.Select(e => e.ErrorMessage).ToArray() ?? Array.Empty<string>()
                    );

                return BadRequest(ApiResponse<object>.CreateValidationError(validationErrors));
            }

            if (wallet == null)
            {
                return BadRequest(ApiResponse<object>.CreateError("Wallet data is required", "MISSING_WALLET_DATA"));
            }

            var correlationId = HttpContext.GetCorrelationId();
            _logger.LogInformation("Updating wallet ID: {WalletId} - CorrelationId: {CorrelationId}", id, correlationId);

            var response = await _wallet.updateAsync(id, wallet);

            if (response == null)
            {
                return NotFound(ApiResponse<object>.CreateNotFound($"Wallet with ID {id} not found"));
            }

            return Ok(ApiResponse<object>.CreateSuccess(response, "Wallet updated successfully"));
        }

        [HttpDelete("delete/{id}")]
        [Authorize(Policy = "AdminOnly")] // Only admins can delete wallets
        [AuditLog("Delete Wallet")]
        public async Task<ActionResult<ApiResponse<object>>> Delete(int id)
        {
            if (id <= 0)
            {
                return BadRequest(ApiResponse<object>.CreateError("Invalid wallet ID", "INVALID_WALLET_ID"));
            }

            var correlationId = HttpContext.GetCorrelationId();
            _logger.LogInformation("Deleting wallet ID: {WalletId} - CorrelationId: {CorrelationId}", id, correlationId);

            var response = await _wallet.deleteAsync(id);

            if (response == null || response.Contains("not found", StringComparison.OrdinalIgnoreCase))
            {
                return NotFound(ApiResponse<object>.CreateNotFound($"Wallet with ID {id} not found"));
            }

            return Ok(ApiResponse<object>.CreateSuccess(response, "Wallet deleted successfully"));
        }

        [HttpGet("last-five-transactions/{walletId}")]
        public async Task<ActionResult<ApiResponse<object>>> GetLastFiveTransactions(int walletId)
        {
            if (walletId <= 0)
            {
                return BadRequest(ApiResponse<object>.CreateError("Invalid wallet ID", "INVALID_WALLET_ID"));
            }

            var correlationId = HttpContext.GetCorrelationId();
            _logger.LogInformation("Getting last five transactions for wallet ID: {WalletId} - CorrelationId: {CorrelationId}",
                walletId, correlationId);

            var transactions = await _wallet.lastFiveTransactions(walletId);
            return Ok(ApiResponse<object>.CreateSuccess(transactions, "Last five transactions retrieved successfully"));
        }

        [HttpGet("transactions/{id}")]
        public async Task<ActionResult<ApiResponse<object>>> GetTransactions(int id, [FromQuery] SearchPaging props)
        {
            if (id <= 0)
            {
                return BadRequest(ApiResponse<object>.CreateError("Invalid wallet ID", "INVALID_WALLET_ID"));
            }

            var correlationId = HttpContext.GetCorrelationId();
            _logger.LogInformation("Getting transactions for wallet ID: {WalletId} - CorrelationId: {CorrelationId}",
                id, correlationId);

            var response = await _wallet.GetTransactionsAsync(id, props);
            var result = _mapper.Map<List<TransactionDto>>(response);
            var metadata = new
            {
                response.PageSize,
                response.TotalPages,
                response.TotalCount,
                response.CurrentPage,
                response.HasNext
            };

            return Ok(ApiResponse<object>.CreateSuccess(result, "Transactions retrieved successfully", metadata));
        }
    }
}