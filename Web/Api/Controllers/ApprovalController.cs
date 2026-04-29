using Api.DTO;
using Api.Helpers;
using Api.Interfaces;
using Api.Models;
using Api.Services;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Api.Controllers
{
    /// <summary>
    /// Admin-only endpoints for approving, rejecting or suspending vendor and rider applications.
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    [Produces("application/json")]
    [Authorize(Policy = "AdminOnly")]
    public class ApprovalController : ControllerBase
    {
        private readonly DBContext _db;
        private readonly IMapper _mapper;
        private readonly IEmailVerification _email;
        private readonly ILogger<ApprovalController> _logger;

        public ApprovalController(
            DBContext db,
            IMapper mapper,
            IEmailVerification email,
            ILogger<ApprovalController> logger)
        {
            _db = db;
            _mapper = mapper;
            _email = email;
            _logger = logger;
        }

        // ---------- Vendor Approvals ----------

        [HttpGet("vendors")]
        public async Task<IActionResult> GetVendorsByStatus([FromQuery] string status = "Pending", [FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 20)
        {
            var query = _db.Vendors
                .Where(v => v.ApprovalStatus == status)
                .OrderByDescending(v => v.CreatedAt)
                .Include(v => v.Addresses)
                .AsSplitQuery();
            var paged = PagedList<Vendor>.ToPagedList(await query.ToListAsync(), pageNumber, pageSize);
            var result = _mapper.Map<List<VendorDtoLite>>(paged);
            var dataList = new { paged.PageSize, paged.TotalPages, paged.TotalCount, paged.CurrentPage, paged.HasNext };
            return Ok(new { result, dataList });
        }

        [HttpPut("vendors/{id}/approve")]
        public async Task<IActionResult> ApproveVendor(int id, [FromBody] ApprovalDecisionDto? body)
        {
            var vendor = await _db.Vendors.FirstOrDefaultAsync(v => v.Id == id);
            if (vendor == null) return NotFound(new { message = "Vendor not found" });
            vendor.ApprovalStatus = "Approved";
            vendor.ApprovalReason = body?.Reason;
            vendor.ApprovalDecisionAt = DateTime.UtcNow;
            vendor.IsActive = true;
            vendor.UpdatedAt = DateTime.UtcNow;
            await _db.SaveChangesAsync();
            await TryNotify(vendor.Email, "Welcome to LifePadi", $"Hi {vendor.Name}, your vendor application has been approved. You can now sign in.");
            return Ok(new { success = "Vendor approved", id = vendor.Id, status = vendor.ApprovalStatus });
        }

        [HttpPut("vendors/{id}/reject")]
        public async Task<IActionResult> RejectVendor(int id, [FromBody] ApprovalDecisionDto body)
        {
            if (string.IsNullOrWhiteSpace(body?.Reason))
                return BadRequest(new { message = "A reason is required when rejecting a vendor" });
            var vendor = await _db.Vendors.FirstOrDefaultAsync(v => v.Id == id);
            if (vendor == null) return NotFound(new { message = "Vendor not found" });
            vendor.ApprovalStatus = "Rejected";
            vendor.ApprovalReason = body.Reason;
            vendor.ApprovalDecisionAt = DateTime.UtcNow;
            vendor.IsActive = false;
            vendor.UpdatedAt = DateTime.UtcNow;
            await _db.SaveChangesAsync();
            await TryNotify(vendor.Email, "Your LifePadi vendor application", $"Hi {vendor.Name}, unfortunately your application was not approved. Reason: {body.Reason}");
            return Ok(new { success = "Vendor rejected", id = vendor.Id, status = vendor.ApprovalStatus });
        }

        [HttpPut("vendors/{id}/suspend")]
        public async Task<IActionResult> SuspendVendor(int id, [FromBody] ApprovalDecisionDto body)
        {
            if (string.IsNullOrWhiteSpace(body?.Reason))
                return BadRequest(new { message = "A reason is required when suspending a vendor" });
            var vendor = await _db.Vendors.FirstOrDefaultAsync(v => v.Id == id);
            if (vendor == null) return NotFound(new { message = "Vendor not found" });
            vendor.ApprovalStatus = "Suspended";
            vendor.ApprovalReason = body.Reason;
            vendor.ApprovalDecisionAt = DateTime.UtcNow;
            vendor.IsActive = false;
            vendor.UpdatedAt = DateTime.UtcNow;
            await _db.SaveChangesAsync();
            await TryNotify(vendor.Email, "Your LifePadi vendor account is suspended", $"Hi {vendor.Name}, your account has been suspended. Reason: {body.Reason}");
            return Ok(new { success = "Vendor suspended", id = vendor.Id, status = vendor.ApprovalStatus });
        }

        // ---------- Rider Approvals ----------

        [HttpGet("riders")]
        public async Task<IActionResult> GetRidersByStatus([FromQuery] string status = "Pending", [FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 20)
        {
            var query = _db.Riders
                .Where(r => r.ApprovalStatus == status)
                .OrderByDescending(r => r.CreatedAt)
                .AsSplitQuery();
            var paged = PagedList<Rider>.ToPagedList(await query.ToListAsync(), pageNumber, pageSize);
            var result = _mapper.Map<List<RiderDtoLite>>(paged);
            var dataList = new { paged.PageSize, paged.TotalPages, paged.TotalCount, paged.CurrentPage, paged.HasNext };
            return Ok(new { result, dataList });
        }

        [HttpPut("riders/{id}/approve")]
        public async Task<IActionResult> ApproveRider(int id, [FromBody] ApprovalDecisionDto? body)
        {
            var rider = await _db.Riders.FirstOrDefaultAsync(r => r.Id == id);
            if (rider == null) return NotFound(new { message = "Rider not found" });
            rider.ApprovalStatus = "Approved";
            rider.ApprovalReason = body?.Reason;
            rider.ApprovalDecisionAt = DateTime.UtcNow;
            rider.IsActive = true;
            rider.IsVerified = true;
            rider.UpdatedAt = DateTime.UtcNow;
            await _db.SaveChangesAsync();
            await TryNotify(rider.Email, "Welcome to LifePadi", $"Hi {rider.FirstName}, your rider application has been approved. You can now sign in.");
            return Ok(new { success = "Rider approved", id = rider.Id, status = rider.ApprovalStatus });
        }

        [HttpPut("riders/{id}/reject")]
        public async Task<IActionResult> RejectRider(int id, [FromBody] ApprovalDecisionDto body)
        {
            if (string.IsNullOrWhiteSpace(body?.Reason))
                return BadRequest(new { message = "A reason is required when rejecting a rider" });
            var rider = await _db.Riders.FirstOrDefaultAsync(r => r.Id == id);
            if (rider == null) return NotFound(new { message = "Rider not found" });
            rider.ApprovalStatus = "Rejected";
            rider.ApprovalReason = body.Reason;
            rider.ApprovalDecisionAt = DateTime.UtcNow;
            rider.IsActive = false;
            rider.IsVerified = false;
            rider.UpdatedAt = DateTime.UtcNow;
            await _db.SaveChangesAsync();
            await TryNotify(rider.Email, "Your LifePadi rider application", $"Hi {rider.FirstName}, unfortunately your application was not approved. Reason: {body.Reason}");
            return Ok(new { success = "Rider rejected", id = rider.Id, status = rider.ApprovalStatus });
        }

        [HttpPut("riders/{id}/suspend")]
        public async Task<IActionResult> SuspendRider(int id, [FromBody] ApprovalDecisionDto body)
        {
            if (string.IsNullOrWhiteSpace(body?.Reason))
                return BadRequest(new { message = "A reason is required when suspending a rider" });
            var rider = await _db.Riders.FirstOrDefaultAsync(r => r.Id == id);
            if (rider == null) return NotFound(new { message = "Rider not found" });
            rider.ApprovalStatus = "Suspended";
            rider.ApprovalReason = body.Reason;
            rider.ApprovalDecisionAt = DateTime.UtcNow;
            rider.IsActive = false;
            rider.UpdatedAt = DateTime.UtcNow;
            await _db.SaveChangesAsync();
            await TryNotify(rider.Email, "Your LifePadi rider account is suspended", $"Hi {rider.FirstName}, your account has been suspended. Reason: {body.Reason}");
            return Ok(new { success = "Rider suspended", id = rider.Id, status = rider.ApprovalStatus });
        }

        private async Task TryNotify(string? to, string subject, string body)
        {
            if (string.IsNullOrWhiteSpace(to)) return;
            try
            {
                await _email.SendEmailAsync(to, subject, body);
            }
            catch (Exception ex)
            {
                // Approval should not fail because email delivery failed.
                _logger.LogWarning(ex, "Failed to send approval notification email to {Email}", to);
            }
        }
    }
}
