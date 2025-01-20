using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.DTO;
using Api.Helpers;
using Api.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AdminController : ControllerBase
    {
        private readonly IAdmin? _iadmin;
        private readonly IMapper _mapper;
        private readonly IEmailVerification _emailVerify;
        public AdminController(IAdmin iadmin, IMapper mapper, IEmailVerification emailVerify)
        {
            _iadmin = iadmin;
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
                // var templatePath = Path.Combine(Directory.GetCurrentDirectory(), "Templates", "EmailMessage.html");
                // var htmlTemplate = await System.IO.File.ReadAllTextAsync(templatePath);

                var htmlTemplate = "<div><div style='height: 100px; background-color: #333; padding: 10px 10px; border-bottom: 1px solid #e7e7e7; display: flex; justify-content: center; align-items: center;'><div class='width: 150px; height: 100px'><img src='https://res.cloudinary.com/dbxapeqzu/image/upload/v1725192449/LifePadi/logo/Logo_name_tagline_light_chiec1_rh825p.png' style='width: 100%; height: 100%; display: block;' alt='Logo' /></div></div><h1>Hi, {{subject}}</h1><p>Use the code below to verify your email address</p><h2>{code}</h2></div>";

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
                var admin = await _iadmin!.getAsync(id);
                if (admin == null) return NotFound();
                return Ok(admin);
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
                var admins = await _iadmin!.getAllAsync(props);
                var result = _mapper.Map<List<AdminDtoLite>>(admins);

                var dataList = new
                {
                    admins.TotalCount,
                    admins.TotalPages,
                    admins.CurrentPage,
                    admins.PageSize
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
                var response = await _iadmin!.deleteAsync(id);
                if (response == null) return NotFound();
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("create")]
        public async Task<IActionResult> create([FromForm] AdminDto admin)
        {
            try
            {
                if (!ModelState.IsValid) return BadRequest("Some form values are not correct");
                var authAdmin = await _iadmin!.createAsync(admin);
                return Ok(authAdmin);

            }
            catch (Exception ex)
            {
                if (ex.Message.Contains("Email already exists"))
                {
                    return StatusCode(409, ex.Message);
                }
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("update/{id}")]
        public async Task<IActionResult> update(int id, [FromForm] AdminDto admin)
        {
            try
            {
                var updateCustomer = await _iadmin!.updateAsync(admin, id);
                if (updateCustomer == null) return NotFound();
                return Ok(updateCustomer);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

       


        [HttpPost("send-otp")]
        public async Task<IActionResult> sendOtp([FromForm] string phoneNumber)
        {
            try
            {
                var response = await _iadmin!.sendOtp(phoneNumber);
                return Ok(response);
            }
            catch (Exception ex)
            {
                if (ex.Message.Contains("Phone number already exists"))
                {
                    return StatusCode(409, ex.Message);
                }
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("verify-otp")]
        public async Task<IActionResult> verifyOtp([FromQuery] OtpDto otpVerify)
        {
            try
            {
                var response = await _iadmin!.verifyOtp(otpVerify.pinId!, otpVerify.pin!);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        

        [HttpPost("password-reset")]
        public async Task<IActionResult> passwordReset([FromForm] string phoneNumber)
        {
            try
            {
                var user = await _iadmin!.checkPhoneExists(phoneNumber);
                if (user == false) return NotFound("User not found");
                var response = await _iadmin!.passwordReset(phoneNumber);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("activate/{id}")]
        public async Task<IActionResult> activate(int id)
        {
            try
            {
                var response = await _iadmin!.toggleStatus(id);
                return Ok(response);
            }
            catch (Exception ex)
            {
                if (ex.Message.Contains("Admin not found"))
                {
                    return NotFound(ex.Message);
                }
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("deactivate/{id}")]
        public async Task<IActionResult> deActivate(int id)
        {
            try
            {
                var response = await _iadmin!.toggleStatus(id);
                return Ok(response);
            }
            catch (Exception ex)
            {
                if (ex.Message.Contains("Admin not found"))
                {
                    return NotFound(ex.Message);
                }
                return BadRequest(ex.Message);
            }
        }

    }
}