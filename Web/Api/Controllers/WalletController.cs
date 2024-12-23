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
    public class WalletController : ControllerBase
    {
        private readonly IWallet _wallet;

        public WalletController(IWallet wallet)
        {
            _wallet = wallet;
        }
//wallet controller

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

        [HttpGet("last-five-transactions/{walletId}")]
        public async Task<IActionResult> getLastFiveTransactions(int walletId)
        {
            try
            {
                var transactions = await _wallet.lastFiveTransactions(walletId);
                return Ok(transactions);
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        
    }
}