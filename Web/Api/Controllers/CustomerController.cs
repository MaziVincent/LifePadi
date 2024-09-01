using Api.DTO;
using Api.Interfaces;
using Api.Models;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using Api.Helpers;
using System;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CustomerController : ControllerBase
    {
        private readonly ICustomer? _icustomer;
        private readonly IMapper _mapper;
        private readonly IEmailVerification _emailVerify;
        public CustomerController(ICustomer icustomer, IMapper mapper, IEmailVerification emailVerify)
        {
            _icustomer = icustomer;
            _mapper = mapper;
            _emailVerify = emailVerify;
        }

        [HttpPost("verifyEmail")]
        public async Task<IActionResult> verifyEmail([FromForm] string Email)
        {
            try
            {
                var genCode = new GenerateCode();
                var code = genCode.generateVerificationCode();
                var templatePath = Path.Combine(Directory.GetCurrentDirectory(), "Templates", "EmailMessage.html");
                // var htmlTemplate = await System.IO.File.ReadAllTextAsync(templatePath);

                // var imgPath = Path.Combine(Directory.GetCurrentDirectory(), "Templates", "images", "Logo+name+tagline(light).svg");
                // byte[] imageArray = await System.IO.File.ReadAllBytesAsync(imgPath);
                // string base64Image = Convert.ToBase64String(imageArray);
                // htmlTemplate = htmlTemplate.Replace("{imageBase64}", base64Image);
                var htmlTemplate = "<h1>Hi, {{subject}}</h1><p>Use the code below to verify your email address</p><h2>{code}</h2>";

                // Replace the {code} token with the actual code
                htmlTemplate = htmlTemplate.Replace("{code}", code);

                string subject = "Verify your email address";
                // Replace the {{subject}} token with the actual code
                htmlTemplate = htmlTemplate.Replace("{{subject}}", subject);

                // Use the modified HTML template as the email body
                string body = htmlTemplate;
                await _emailVerify.SendEmailAsync(Email!, subject, body);
                return Ok(new { Code = code, Message = "Sent successfully" });
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
                var customer = await _icustomer!.getAsync(id);
                if (customer == null) return NotFound();
                return Ok(customer);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("all")]
        public async Task<IActionResult> getAll([FromQuery] SearchPaging props)
        {
            try
            {
                var customers = await _icustomer!.getAllAsync(props);
                var result = _mapper.Map<List<CustomerDtoLite>>(customers);

                var dataList = new
                {
                    customers.TotalCount,
                    customers.TotalPages,
                    customers.CurrentPage,
                    customers.PageSize
                };

                return Ok(new { result, dataList });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> delete(int id)
        {
            try
            {
                var response = await _icustomer!.deleteAsync(id);
                if (response == null) return NotFound();
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("create")]
        public async Task<IActionResult> create([FromForm] CustomerDto customer)
        {
            try
            {
                if (!ModelState.IsValid) return BadRequest("Some form values are not correct");
                var authCustomer = await _icustomer!.createAsync(customer);
                return Ok(authCustomer);

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("update/{id}")]
        public async Task<IActionResult> update(int id, [FromForm] CustomerDto customer)
        {
            try
            {
                var updateCustomer = await _icustomer!.updateAsync(customer, id);
                if (updateCustomer == null) return NotFound();
                return Ok(updateCustomer);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("orders/{id}")]
        public async Task<IActionResult> getOrders(int id)
        {
            try
            {
                var customerOders = await _icustomer!.getCustomerOders(id);
                return Ok(customerOders);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("addresses/{id}")]
        public async Task<IActionResult> getAddresses(int id)
        {
            try
            {
                var customersAddresses = await _icustomer!.customerAddresses(id);
                return Ok(customersAddresses);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("search")]
        public async Task<IActionResult> search([FromRoute] string searchString)
        {
            try
            {
                var response = await _icustomer!.search(searchString);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("verify-Phone")]
        public async Task<IActionResult> verifyPhone([FromForm] string phone)
        {
            try
            {
                var response = await _icustomer!.sendOtp(phone);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
