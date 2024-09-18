using Api.DTO;
using Api.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TransactionController : ControllerBase
    {
        private readonly ITransaction _itran;
        public TransactionController(ITransaction itran)
        {
            _itran = itran;
        }

        [HttpPost("initiate")]
        public async Task<IActionResult> initiatePayment([FromBody] InitiatePaymentDto initiatePayment)
        {
            try
            {
                var response = await _itran.initiatePayment(initiatePayment);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("confirmPayment")]
        public async Task<IActionResult> confirmPayment([FromQuery] AfterPayment transactionInfo)
        {
            try
            {
                var response = await _itran.confirmPayment(transactionInfo);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("all")]
        public async Task<IActionResult> all()
        {
            try
            {
                var response = await _itran.allAsync();
                return Ok(response);
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
                var response = await _itran.getAsync(id);
                if (response == null) return NotFound();
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("BaniCheckout")]
        public async Task<IActionResult> baniCheckout([FromBody] InitiatePaymentDto initiatePaymentDto)
        {
            try
            {
                var response = await _itran.baniCheckout(initiatePaymentDto);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
