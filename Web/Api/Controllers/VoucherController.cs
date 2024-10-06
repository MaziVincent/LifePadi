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

<<<<<<< HEAD
<<<<<<< HEAD
        [HttpPut("activate/{id}")]
=======
        [HttpPut("{id}/activate")]
>>>>>>> 7f9ad44 (done with payment and voucher)
=======
        [HttpPut("activate/{id}")]
>>>>>>> 32d425d (new commit)
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

<<<<<<< HEAD
        [HttpGet("isExpired/{id}")]
=======
        [HttpGet("{id}/isExpired")]
>>>>>>> 7f9ad44 (done with payment and voucher)
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
<<<<<<< HEAD
<<<<<<< HEAD
        public async Task<IActionResult> create([FromForm] VoucherDto voucher)
=======
        public async Task<IActionResult> create([FromForm] VoucherDTO voucher)
>>>>>>> 7f9ad44 (done with payment and voucher)
=======
        public async Task<IActionResult> create([FromForm] VoucherDto voucher)
>>>>>>> 836ec36 (changed all DTO to Dto)
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

<<<<<<< HEAD
        [HttpDelete("delete/{id}")]
=======
        [HttpDelete("{id}/delete")]
>>>>>>> 7f9ad44 (done with payment and voucher)
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

<<<<<<< HEAD
<<<<<<< HEAD
        [HttpGet("searchWithCode")]
=======
        [HttpGet("seachWithCode")]
>>>>>>> 7f9ad44 (done with payment and voucher)
=======
        [HttpGet("searchWithCode")]
>>>>>>> b7ff8e8 (voucher)
        public async Task<IActionResult> searchWithCode([FromQuery] string code)
        {
            try
            {
                var response = await _ivoucher.searchWithCode(code);
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> b7ff8e8 (voucher)
                if(response == null) 
                {
                    return NotFound();
                    
                }
<<<<<<< HEAD
=======
>>>>>>> 7f9ad44 (done with payment and voucher)
=======
>>>>>>> b7ff8e8 (voucher)
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

<<<<<<< HEAD
<<<<<<< HEAD
        [HttpGet("searchWithName")]
=======
        [HttpGet("seachWithName")]
>>>>>>> 7f9ad44 (done with payment and voucher)
=======
        [HttpGet("searchWithName")]
>>>>>>> b7ff8e8 (voucher)
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
<<<<<<< HEAD
<<<<<<< HEAD
        public async Task<IActionResult> update([FromBody] VoucherDto voucher, int id)
=======
        public async Task<IActionResult> update([FromBody] VoucherDTO voucher, int id)
>>>>>>> 7f9ad44 (done with payment and voucher)
=======
        public async Task<IActionResult> update([FromBody] VoucherDto voucher, int id)
>>>>>>> 836ec36 (changed all DTO to Dto)
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

<<<<<<< HEAD
        [HttpPut("use/{id}")]
=======
        [HttpPut("{id}/use")]
>>>>>>> 7f9ad44 (done with payment and voucher)
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
<<<<<<< HEAD
                if (ex.Message == "Voucher expired") return NotFound(ex.Message);
                if (ex.Message == "Voucher not active") return Unauthorized(ex.Message);
                if (ex.Message == "Voucher exhausted") return NotFound(ex.Message);
=======
>>>>>>> 7f9ad44 (done with payment and voucher)
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("use")]
<<<<<<< HEAD
        public async Task<IActionResult> useVoucherByCustomer([FromQuery] string voucherCode, int customerId)
        {
            try
            {
                var response = await _ivoucher.useVoucherByCustomer(voucherCode, customerId);
                if (response == null) return NotFound("Voucher Code Does not Exist");
                return Ok(response);
            }
            catch (Exception ex)
            {
                if (ex.Message.Contains("Voucher expired")) return NotFound(ex.Message);
                if (ex.Message.Contains("Voucher not active")) return Unauthorized(ex.Message);
                if (ex.Message.Contains("Voucher exhausted")) return NotFound(ex.Message);
                if (ex.Message.Contains("Customer already used this voucher")) return Conflict(ex.Message);
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("use/lite")]
=======
>>>>>>> 7f9ad44 (done with payment and voucher)
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
