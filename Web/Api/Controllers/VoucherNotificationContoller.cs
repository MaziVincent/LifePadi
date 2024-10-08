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
    public class VoucherNotificationContoller : ControllerBase
    {
        private readonly IVoucherNotification _vn;
        public VoucherNotificationContoller(IVoucherNotification vn)
        {
            _vn = vn;
        }

        [HttpGet("all")]
        public async Task<IActionResult> All()
        {
            try
            {
                var voucherNotifications = await _vn.AllAsync();
                return Ok(voucherNotifications);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            try
            {
                var voucherNotification = await _vn.GetAsync(id);
                return Ok(voucherNotification);
            }
            catch (Exception ex)
            {
                if (ex.Message.Contains("VoucherNotification not found")) return NotFound(ex.Message);
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("create")]
        public async Task<IActionResult> Create([FromBody] VoucherNotificationDto voucherNotificationDto)
        {
            try
            {
                if (!ModelState.IsValid) return BadRequest("Please fill in the form correctly");
                var newVoucherNotification = await _vn.Create(voucherNotificationDto);
                return Ok(newVoucherNotification);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] VoucherNotificationDto voucherNotificationDto)
        {
            try
            {
                var updatedVoucherNotification = await _vn.UpdateAsync(id, voucherNotificationDto);
                return Ok(updatedVoucherNotification);
            }
            catch (Exception ex)
            {
                if (ex.Message.Contains("VoucherNotification not found")) return NotFound(ex.Message);
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var response = await _vn.DeleteAsync(id);
                return Ok(response);
            }
            catch (Exception ex)
            {
                if (ex.Message.Contains("VoucherNotification not found")) return NotFound(ex.Message);
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("customer/{customerId}")]
        public async Task<IActionResult> GetByCustomerId(int customerId)
        {
            try
            {
                var voucherNotifications = await _vn.GetByCustomerId(customerId);
                return Ok(voucherNotifications);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("voucher/{voucherId}")]
        public async Task<IActionResult> GetByVoucherId(int voucherId)
        {
            try
            {
                var voucherNotifications = await _vn.GetByVoucherId(voucherId);
                return Ok(voucherNotifications);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpGet("customer/{customerId}/isread/{isRead}")]
        public async Task<IActionResult> GetByCustomerIdAndIsRead(int customerId, bool isRead)
        {
            try
            {
                var voucherNotifications = await _vn.GetByCustomerIdAndIsRead(customerId, isRead);
                return Ok(voucherNotifications);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("customer/{customerId}/voucher/{voucherId}")]
        public async Task<IActionResult> GetByCustomerIdAndVoucherId(int customerId, int voucherId)
        {
            try
            {
                var voucherNotification = await _vn.GetByCustomerIdAndVoucherId(customerId, voucherId);
                return Ok(voucherNotification);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}