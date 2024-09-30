using Api.DTO;
using Api.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VoucherController : ControllerBase
    {
        private readonly IVoucher _ivoucher;
        public VoucherController(IVoucher ivoucher)
        {
            _ivoucher = ivoucher;
        }

        [HttpPut("{id}/activate")]
        public async Task<IActionResult> activate(int id)
        {
            try
            {
                var response = await _ivoucher.activateVoucher(id);
                if (response is null) return NotFound();
                return Ok(response);
            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("all-active")]
        public async Task<IActionResult> allActive()
        {
            try
            {
                var vouchers = await _ivoucher.allActiveAsync();
                return Ok(vouchers);
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
                var vouchers = await _ivoucher.allAsync();
                return Ok(vouchers);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("isExpired/{id}")]
        public async Task<IActionResult> checkIfExpired(int id)
        {
            try
            {
                var response = await _ivoucher.checkIfExpired(id);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("create")]
        public async Task<IActionResult> create([FromForm] VoucherDto voucher)
        {
            try
            {
                var newVoucher = await _ivoucher.createAsync(voucher);
                return Ok(newVoucher);
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("deactivate-all-expired")]
        public async Task<IActionResult> deactivateAllExpired()
        {
            try
            {
                var response = await _ivoucher.deactivateAllExpiredVouchers();
                return Ok(response);
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id}/deactivate")]
        public async Task<IActionResult> deactivate(int id)
        {
            try
            {
                var response = await _ivoucher.deactivateVoucher(id);
                if (response == null) return NotFound();
                return Ok(response);
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{id}/delete")]
        public async Task<IActionResult> delete(int id)
        {
            try
            {
                var response = await _ivoucher.deleteAsync(id);
                if (response == null) return NotFound();
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("expire-all-due")]
        public async Task<IActionResult> expireAllDueVouchers()
        {
            try
            {
                var response = await _ivoucher.expireALlPastDueDate();
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{id}/get")]
        public async Task<IActionResult> get(int id)
        {
            try
            {
                var response = await _ivoucher.getAsync(id);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("current-running-vouchers")]
        public async Task<IActionResult> getCurrentRunningVouchers()
        {
            try
            {
                var response = await _ivoucher.getCurrentRunningVouchers();
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpGet("{id}/numberAvailableVouchers")]
        public async Task<IActionResult> getNumbeOfAvailableVouchers(int id)
        {
            try
            {
                var response = await _ivoucher.getNumberAvailableVoucher(id);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{id}/isActive")]
        public async Task<IActionResult> CheckisActive(int id)
        {
            try
            {
                var response = await _ivoucher.isActive(id);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("seachWithCode")]
        public async Task<IActionResult> searchWithCode([FromQuery] string code)
        {
            try
            {
                var response = await _ivoucher.searchWithCode(code);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("seachWithName")]
        public async Task<IActionResult> searchWithName([FromQuery] string name)
        {
            try
            {
                var response = await _ivoucher.searchWithName(name);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("seachWithType")]
        public async Task<IActionResult> searchWithType([FromQuery] string type)
        {
            try
            {
                var response = await _ivoucher.searchWithType(type);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id}/update")]
        public async Task<IActionResult> update([FromBody] VoucherDto voucher, int id)
        {
            try
            {
                var updatedVoucher = await _ivoucher.updateAsync(voucher, id);
                if (updatedVoucher == null) return NotFound();
                return Ok(updatedVoucher);
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id}/use")]
        public async Task<IActionResult> useVoucher(int id)
        {
            try
            {
                var response = await _ivoucher.useVoucher(id);
                if (response == null) return NotFound();
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("use")]
        public async Task<IActionResult> applyVoucher([FromQuery] string code, Double totalAmount)
        {
            try
            {
                var voucher = await _ivoucher.searchWithCode(code);
                if (voucher == null) return NotFound();
                Double percentage = (Double) voucher.DiscountPercentage! / 100;
                Double percentageAmount = percentage * totalAmount;
                Double amountToPay = totalAmount - percentageAmount;
                var response = await _ivoucher.useVoucher(voucher.Id);
                var res = new
                {
                    response = response,
                    amountToPay = amountToPay,
                };
                return Ok(res);
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


    }
}
