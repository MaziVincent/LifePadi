using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;

namespace Api.Validation
{
    /// <summary>
    /// Validates email format with comprehensive pattern matching
    /// </summary>
    public class EmailValidationAttribute : ValidationAttribute
    {
        private const string EmailPattern = @"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$";
        
        public override bool IsValid(object? value)
        {
            if (value == null || string.IsNullOrWhiteSpace(value.ToString()))
                return true; // Let [Required] handle null/empty validation
                
            return Regex.IsMatch(value.ToString()!, EmailPattern);
        }
        
        public override string FormatErrorMessage(string name)
        {
            return $"{name} must be a valid email address.";
        }
    }

    /// <summary>
    /// Validates phone number format (supports international formats)
    /// </summary>
    public class PhoneValidationAttribute : ValidationAttribute
    {
        private const string PhonePattern = @"^\+?[1-9]\d{1,14}$"; // E.164 format
        
        public override bool IsValid(object? value)
        {
            if (value == null || string.IsNullOrWhiteSpace(value.ToString()))
                return true; // Let [Required] handle null/empty validation
                
            var phone = value.ToString()!.Replace(" ", "").Replace("-", "").Replace("(", "").Replace(")", "");
            return Regex.IsMatch(phone, PhonePattern);
        }
        
        public override string FormatErrorMessage(string name)
        {
            return $"{name} must be a valid phone number (e.g., +1234567890).";
        }
    }

    /// <summary>
    /// Validates password complexity requirements
    /// </summary>
    public class PasswordValidationAttribute : ValidationAttribute
    {
        public int MinLength { get; set; } = 8;
        public bool RequireUppercase { get; set; } = true;
        public bool RequireLowercase { get; set; } = true;
        public bool RequireDigit { get; set; } = true;
        public bool RequireSpecialChar { get; set; } = true;
        
        public override bool IsValid(object? value)
        {
            if (value == null || string.IsNullOrWhiteSpace(value.ToString()))
                return true; // Let [Required] handle null/empty validation
                
            var password = value.ToString()!;
            
            if (password.Length < MinLength)
                return false;
                
            if (RequireUppercase && !password.Any(char.IsUpper))
                return false;
                
            if (RequireLowercase && !password.Any(char.IsLower))
                return false;
                
            if (RequireDigit && !password.Any(char.IsDigit))
                return false;
                
            if (RequireSpecialChar && !password.Any(c => !char.IsLetterOrDigit(c)))
                return false;
                
            return true;
        }
        
        public override string FormatErrorMessage(string name)
        {
            var requirements = new List<string>();
            
            if (MinLength > 0)
                requirements.Add($"at least {MinLength} characters");
            if (RequireUppercase)
                requirements.Add("uppercase letter");
            if (RequireLowercase)
                requirements.Add("lowercase letter");
            if (RequireDigit)
                requirements.Add("digit");
            if (RequireSpecialChar)
                requirements.Add("special character");
                
            return $"{name} must contain {string.Join(", ", requirements)}.";
        }
    }

    /// <summary>
    /// Validates name format (letters, spaces, hyphens, apostrophes only)
    /// </summary>
    public class NameValidationAttribute : ValidationAttribute
    {
        private const string NamePattern = @"^[a-zA-Z\s\-'\.]+$";
        
        public override bool IsValid(object? value)
        {
            if (value == null || string.IsNullOrWhiteSpace(value.ToString()))
                return true; // Let [Required] handle null/empty validation
                
            var name = value.ToString()!.Trim();
            return Regex.IsMatch(name, NamePattern) && name.Length >= 2;
        }
        
        public override string FormatErrorMessage(string name)
        {
            return $"{name} must contain only letters, spaces, hyphens, and apostrophes, and be at least 2 characters long.";
        }
    }

    /// <summary>
    /// Validates file upload size and type
    /// </summary>
    public class FileValidationAttribute : ValidationAttribute
    {
        public long MaxSizeInBytes { get; set; } = 5 * 1024 * 1024; // 5MB default
        public string[] AllowedExtensions { get; set; } = { ".jpg", ".jpeg", ".png", ".gif", ".pdf" };
        
        public override bool IsValid(object? value)
        {
            if (value == null)
                return true; // Let [Required] handle null validation
                
            if (value is not IFormFile file)
                return false;
                
            // Check file size
            if (file.Length > MaxSizeInBytes)
                return false;
                
            // Check file extension
            var extension = Path.GetExtension(file.FileName)?.ToLowerInvariant();
            if (string.IsNullOrEmpty(extension) || !AllowedExtensions.Contains(extension))
                return false;
                
            return true;
        }
        
        public override string FormatErrorMessage(string name)
        {
            var maxSizeMB = MaxSizeInBytes / (1024 * 1024);
            var extensions = string.Join(", ", AllowedExtensions);
            return $"{name} must be under {maxSizeMB}MB and have one of these extensions: {extensions}.";
        }
    }

    /// <summary>
    /// Validates that a string doesn't contain potentially harmful content
    /// </summary>
    public class NoHtmlValidationAttribute : ValidationAttribute
    {
        public override bool IsValid(object? value)
        {
            if (value == null || string.IsNullOrWhiteSpace(value.ToString()))
                return true;
                
            var input = value.ToString()!;
            
            // Check for HTML tags
            if (Regex.IsMatch(input, @"<[^>]*>"))
                return false;
                
            // Check for script injection patterns
            if (Regex.IsMatch(input, @"(javascript:|vbscript:|onload=|onerror=)", RegexOptions.IgnoreCase))
                return false;
                
            return true;
        }
        
        public override string FormatErrorMessage(string name)
        {
            return $"{name} cannot contain HTML tags or script content.";
        }
    }

    /// <summary>
    /// Validates positive numbers
    /// </summary>
    public class PositiveNumberAttribute : ValidationAttribute
    {
        public bool AllowZero { get; set; } = false;
        
        public override bool IsValid(object? value)
        {
            if (value == null)
                return true;
                
            if (decimal.TryParse(value.ToString(), out var number))
            {
                return AllowZero ? number >= 0 : number > 0;
            }
            
            return false;
        }
        
        public override string FormatErrorMessage(string name)
        {
            return AllowZero 
                ? $"{name} must be zero or a positive number."
                : $"{name} must be a positive number.";
        }
    }
}
