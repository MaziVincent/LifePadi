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
                var response = await _itran.InitiatePayment(initiatePayment);
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
                var response = await _itran.ConfirmPayment(transactionInfo);
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
                var response = await _itran.AllAsync();
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
                var response = await _itran.GetAsync(id);
                if (response == null) return StatusCode(404, "Transaction not found");
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
                var response = await _itran.BaniCheckout(initiatePaymentDto);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("PaystackCheckout")]
        public async Task<IActionResult> paystackCheckout([FromBody] InitiatePaymentDto initiatePaymentDto)
        {
            try
            {
                var response = await _itran.PaystackCheckout(initiatePaymentDto);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("MobilePaystackCheckout")]
        public async Task<IActionResult> mobilePaystackCheckout([FromBody] InitiatePaymentDto initiatePaymentDto)
        {
            try
            {
                var response = await _itran.MobilePaystackCheckout(initiatePaymentDto);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("paystack-confirmPayment")]
        public async Task<IActionResult> paystackVerifyPayment([FromQuery] string reference)
        {
            try
            {
                var response = await _itran.PaystackVerifyPayment(reference);
                Console.WriteLine($"response {response}");
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("transactionByOrderId/{orderId}")]
        public async Task<IActionResult> transactionByOrderId(int orderId)
        {
            try
            {
                var response = await _itran.GetTransactionByOrderId(orderId);
                if (response == null) return StatusCode(404, " Transaction not found ");
                return Ok(response);
            }
            catch (Exception ex)
            {
                if (ex.Message.Contains("Transaction not found"))
                {
                    return StatusCode(404, ex.Message);
                }
                return BadRequest(ex.Message);
            }
        }
    }
}
