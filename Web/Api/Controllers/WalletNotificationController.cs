using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.DTO;
using Api.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class WalletNotificationController : ControllerBase
    {
        private readonly IWalletNotification _walletNotification;
        public WalletNotificationController(IWalletNotification walletNotification)
        {
            _walletNotification = walletNotification;
        }

        [HttpPost("create")]
        public async Task<IActionResult> createAsync([FromBody] WalletNotificationDto walletNotificationDto)
        {
            try
            {
                var result = await _walletNotification.createAsync(walletNotificationDto);
                return Ok(result);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> deleteAsync(int id)
        {
            try
            {
                var result = await _walletNotification.deleteAsync(id);
                return Ok(result);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("get/{id}")]
        public async Task<IActionResult> getAsync(int id)
        {
            try
            {
                var result = await _walletNotification.getAsync(id);
                return Ok(result);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // service not implemented yet
        // TODO: Implement getAllAsync in WalletNotificationService before use
        [HttpGet("getAll")]
        public async Task<IActionResult> getAllAsync([FromQuery] SearchPaging props)
        {
            try
            {
                var result = await _walletNotification.getAllAsync(props);
                return Ok(result);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("getByWalletId/{walletId}")]
        public async Task<IActionResult> getByWalletIdAsync(int walletId)
        {
            try
            {
                var result = await _walletNotification.getByWalletId(walletId);
                return Ok(result);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("getByCustomerId/{customerId}")]
        public async Task<IActionResult> getByCustomerIdAsync(int customerId)
        {
            try
            {
                var result = await _walletNotification.getByCustomerId(customerId);
                return Ok(result);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("getByDate")]
        public async Task<IActionResult> getByDateAsync([FromQuery] DateTime date)
        {
            try
            {
                var result = await _walletNotification.getByDate(date);
                return Ok(result);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("getByDateRange")]
        public async Task<IActionResult> getByDateRangeAsync([FromQuery] DateTime startDate, [FromQuery] DateTime endDate)
        {
            try
            {
                var result = await _walletNotification.getByDateRange(startDate, endDate);
                return Ok(result);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("getByDateRangeForWallet/{walletId}")]
        public async Task<IActionResult> getByDateRangeForWalletAsync(int walletId, [FromQuery] DateTime startDate, [FromQuery] DateTime endDate)
        {
            try
            {
                var result = await _walletNotification.getByDateRangeForWallet(walletId, startDate, endDate);
                return Ok(result);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("getByReadStatus/{walletId}")]
        public async Task<IActionResult> getByReadStatusAsync(int walletId, [FromQuery] bool readStatus)
        {
            try
            {
                var result = await _walletNotification.getByReadStatusForWallet(walletId, readStatus);
                return Ok(result);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("getByType")]
        public async Task<IActionResult> getByTypeAsync([FromQuery] string type)
        {
            try
            {
                var result = await _walletNotification.getByType(type);
                return Ok(result);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPut("update/{id}")]
        public async Task<IActionResult> updateAsync(int id, [FromBody] WalletNotificationDto walletNotificationDto)
        {
            try
            {
                var result = await _walletNotification.updateAsync(id, walletNotificationDto);
                return Ok(result);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
