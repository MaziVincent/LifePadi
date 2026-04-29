using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using System.ComponentModel.DataAnnotations;

namespace Api.Models
{
    public class User : IdentityUser<int>
    {
        [StringLength(50, MinimumLength = 2)]
        [RegularExpression(@"^([A-Za-z-.']+)$", ErrorMessage = "format not accepted")]
        public string? FirstName { get; set; }

        [StringLength(50, MinimumLength = 2)]
        [RegularExpression(@"^([A-Za-z-.']+)$", ErrorMessage = "format not accepted")]
        public string? LastName { get; set; }

        public string? ContactAddress { get; set; }
        public string? RefreshToken { get; set; }
        public DateTime? CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; } = DateTime.UtcNow;
        public string? SearchString { get; set; }
        public string? PasswordResetToken { get; set; }
        public bool? IsActive { get; set; } = true;

        /// <summary>
        /// Approval lifecycle for vendors/riders. One of: "Pending", "Approved", "Rejected", "Suspended".
        /// Customers/Admins default to "Approved" so they're never blocked at login.
        /// </summary>
        public string? ApprovalStatus { get; set; } = "Approved";

        /// <summary>
        /// Free-text reason captured by an admin when rejecting/suspending a vendor or rider.
        /// </summary>
        public string? ApprovalReason { get; set; }

        /// <summary>
        /// Set when an admin acts on the approval (approve/reject/suspend).
        /// </summary>
        public DateTime? ApprovalDecisionAt { get; set; }
        public List<Address>? Addresses { get; set; }
    }
}
