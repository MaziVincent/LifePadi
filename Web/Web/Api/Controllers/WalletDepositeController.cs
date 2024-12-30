using System;
using System.Collections.Generic;
using System.Linq;
using System.Numerics;
using System.Threading.Tasks;
using Api.DTO;
using Api.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    
    public class WalletDepositeController : ControllerBase
    {
        private readonly IWalletDeposite _walletDeposite;
        public WalletDepositeController(IWalletDeposite walletDeposite)
        {
            _walletDeposite = walletDeposite;
        }

        [HttpPost("deposite/{walletId}")]
        public async Task<IActionResult> deposite(int walletId, [FromBody] DepositeDto t)
        {
            try
            {
                var response = await _walletDeposite.createAsync(t);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("deposites/{walletId}")]
        public async Task<IActionResult> getDeposites(int walletId, SearchPaging props)
        {
            try
            {
                var response = await _walletDeposite.getByWalletId(walletId, props);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("customer-deposites/{customerId}")]
        public async Task<IActionResult> getCustomerDeposites(int customerId)
        {
            try
            {
                var response = await _walletDeposite.getByCustomerId(customerId);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("by-status")]
        public async Task<IActionResult> getDepositesByStatus(string status)
        {
            try
            {
                var response = await _walletDeposite.getByStatus(status);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("by-payment-method")]
        public async Task<IActionResult> getDepositesByPaymentMethod(string paymentMethod)
        {
            try
            {
                var response = await _walletDeposite.getByPaymentMethod(paymentMethod);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("by-transaction-id")]
        public async Task<IActionResult> getDepositesByTransactionId(BigInteger transactionId)
        {
            try
            {
                var response = await _walletDeposite.getByTransactionId(transactionId);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("by-reference-id")]
        public async Task<IActionResult> getDepositesByReferenceId(string referenceId)
        {
            try
            {
                var response = await _walletDeposite.getByReferenceId(referenceId);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("by-date")]
        public async Task<IActionResult> getDepositesByDate(DateTime date)
        {
            try
            {
                var response = await _walletDeposite.getByDate(date);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("by-date-range")]
        public async Task<IActionResult> getDepositesByDateRange(DateTime startDate, DateTime endDate)
        {
            try
            {
                var response = await _walletDeposite.getByDateRange(startDate, endDate);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("by-date-range/{customerId}")]
        public async Task<IActionResult> getDepositesByDateRangeForCustomer(int customerId, DateTime startDate, DateTime endDate)
        {
            try
            {
                var response = await _walletDeposite.getByDateRangeForCustomer(customerId, startDate, endDate);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("total-amount/{walletId}")]
        public async Task<IActionResult> totalDepositeAmount(int walletId)
        {
            try
            {
                var response = await _walletDeposite.totalAmountByWalletId(walletId);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("deposite/customer-transaction-stats/{customerId}")]
        public async Task<IActionResult> customerTransactionStats(int customerId)
        {
            try
            {
                var response = await _walletDeposite.customerTransactionStats(customerId);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("deposite/amount-range")]
        public async Task<IActionResult> getDepositesByAmountRange(double startAmount, double endAmount)
        {
            try
            {
                var response = await _walletDeposite.getByAmountRange(startAmount, endAmount);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("initiate-web")]
        public async Task<IActionResult> initiateWeb([FromBody] InitiateDepositeDto initiateDepositeDto)
        {
            try
            {
                var response = await _walletDeposite.initiateWalletDepositWeb(initiateDepositeDto);
                return Ok(response);
            }
            catch (Exception ex)
            {
                if (ex.Message.Contains("Wallet not found"))
                {
                    return NotFound(ex.Message);
                }
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("initiate")]
        public async Task<IActionResult> initiate([FromBody] InitiateDepositeDto initiateDepositeDto)
        {
            try
            {
                var response = await _walletDeposite.initiateWalletDeposit(initiateDepositeDto);
                return Ok(response);
            }
            catch (Exception ex)
            {
                if(ex.Message.Contains("Wallet not found"))
                {
                    return NotFound(ex.Message);
                }
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("confirmDeposite")]
        public async Task<IActionResult> confirmDeposite([FromQuery] string reference)
        {
            try
            {
                var response = await _walletDeposite.confirmWalletDeposit(reference);
                return Ok(response);
            }
            catch (Exception ex)
            {
                if (ex.Message.Contains("Wallet not found"))
                {
                    return NotFound(ex.Message);
                }
                return BadRequest(ex.Message);
            }
        }
    }
}