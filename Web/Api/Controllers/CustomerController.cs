using Api.DTO;
using Api.Interfaces;
using Api.Models;
using API.DTO;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CustomerController : ControllerBase
    {
        private readonly ICustomer? _icustomer;
        private readonly IMapper _mapper;
        public CustomerController(ICustomer icustomer, IMapper mapper)
        {
            _icustomer = icustomer;
            _mapper = mapper;
        }

        [HttpGet("get/{id}")]
        public async Task<IActionResult> get(int id)
        {
            try
            {
                var customer = await _icustomer!.getAsync(id);
                if (customer == null) return NotFound();
                return Ok(customer);
            }catch (Exception ex)
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
            }catch (Exception ex)
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
            }catch(Exception ex)
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
            }catch (Exception ex)
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
            }catch (Exception ex)
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
            }catch (Exception ex)
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
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
