using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Api.Interfaces;
using Api.DTO;

namespace Api.Controllers
{
    public class LogisticController : ControllerBase
    {
        private readonly ILogistic _logisticService;

        public LogisticController(ILogistic logisticService)
        {
            _logisticService = logisticService;
        }

        [HttpPost("create")]
        public async Task<IActionResult> create(LogisticDto logisticDto)
        {
            try
            {
                var response = await _logisticService.createAsync(logisticDto);
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
                var response = await _logisticService.getAll();
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
                var response = await _logisticService.getAsync(id);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("allAsync")]
        public async Task<IActionResult> allAsync([FromQuery] SearchPaging props)
        {
            try
            {
                var response = await _logisticService.allAsync(props);
                return Ok(response);
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
                var response = await _logisticService.deleteAsync(id);
                if (response == null) return NotFound();
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}