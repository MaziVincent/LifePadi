using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.DTO;
using Api.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class WalletWithdrawalController : ControllerBase
    {
        private readonly IWalletWithdrawal _walletWithdrawal;
        private readonly IMapper _mapper;
        public WalletWithdrawalController(IWalletWithdrawal walletWithdrawal, IMapper mapper)
        {
            _walletWithdrawal = walletWithdrawal;
            _mapper = mapper;
        }

        [HttpPost("withdraw/{walletId}")]
        public async Task<IActionResult> withdraw(int walletId, [FromBody] WithdrawalDto t)
        {
            try
            {
                var response = await _walletWithdrawal.createAsync(t);
                return Ok(response);
            }
            catch (Exception ex)
            {
                if (ex.Message.Contains("Insufficient balance")) return BadRequest(ex.Message);

                if (ex.Message.Contains("Wallet not found")) return NotFound(ex.Message);

                return BadRequest(ex.Message);
            }
        }

        [HttpGet("withdrawals/{walletId}")]
        public async Task<IActionResult> getWithdrawals(int walletId, SearchPaging props)
        {
            try
            {
                var response = await _walletWithdrawal.getByWalletId(walletId, props);
                var result = _mapper.Map<List<WithdrawalDto>>(response);
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
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("stats/{customerId}")]
        public async Task<IActionResult> getWithdrawalStats(int customerId)
        {
            try
            {
                var response = await _walletWithdrawal.customerTransactionStats(customerId);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("all")]
        public async Task<IActionResult> all([FromQuery] SearchPaging props)
        {
            try
            {
                var response = await _walletWithdrawal.getAllAsync(props);
                var result = _mapper.Map<List<WithdrawalDto>>(response);
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
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("get/{id}")]
        public async Task<IActionResult> get(int id)
        {
            try
            {
                var response = await _walletWithdrawal.getAsync(id);
                return Ok(response);
            }
            catch (Exception ex)
            {
                if (ex.Message.Contains("Withdrawal not found")) return NotFound(ex.Message);
                return BadRequest(ex.Message);
            }
        }
    }
}
