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
        public List<Address>? Addresses { get; set; }
    }
}
