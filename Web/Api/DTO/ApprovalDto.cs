using System.ComponentModel.DataAnnotations;

namespace Api.DTO
{
    /// <summary>
    /// Payload submitted by an admin when approving, rejecting or suspending a vendor/rider.
    /// </summary>
    public class ApprovalDecisionDto
    {
        /// <summary>
        /// Optional human-readable reason. Required for "Rejected"/"Suspended" decisions.
        /// </summary>
        [StringLength(500)]
        public string? Reason { get; set; }
    }
}
