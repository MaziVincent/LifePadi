using System;
using System.Collections.Generic;
using System.Linq;
using Api.DTO;
using Api.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CustomerSupportController : ControllerBase
    {
        private readonly ICustomerSupport _iSupport;
        public CustomerSupportController(ICustomerSupport support)
        {
            _iSupport = support;
        }

        [HttpPost("create")]
        public async Task<IActionResult> create([FromBody] CustomerSupportDto support){

            try{
                var result = await _iSupport.createAsync(support);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("all")]
        public async Task<IActionResult> getAll()
        {
            try
            {
                var supports = await _iSupport.allAsync();
                return Ok(supports);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 6b6a266 (search commit)

        [HttpPost("send")]
        public async Task<IActionResult> sendSupport([FromBody] EmailDto email)
        {

            try
            {
                var result = await _iSupport.SendEmailAsync(email);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
<<<<<<< HEAD
=======
>>>>>>> 9391cc8 (faq, customer support and term)
=======
>>>>>>> 6b6a266 (search commit)
    }
}