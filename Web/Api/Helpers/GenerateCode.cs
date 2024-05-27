using System.Security.Cryptography;
using System.Text;

namespace Api.Helpers
{
    public class GenerateCode
    {
        public static string GenerateRandomString()
        {
            Random random = new Random();
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < 10; i++)
            {
                sb.Append(chars[random.Next(chars.Length)]);
            }
<<<<<<< HEAD
            return "LifePadi-" + sb.ToString();
        }

        public string generateVerificationCode()
        {
            string[] newNum = new string[4];
            Random random = new Random();

            for (int i = 0; i < 4; i++)
            {
                newNum[i] = random.Next(10).ToString();
            }
            string codeRand = string.Join("", newNum);
            return (codeRand);
        }


        public static string generateOrder_Id()
        {
            // Generate a new UUID (GUID)
            Guid guid = Guid.NewGuid();

            // Convert the GUID to a 12-character string
            string shortGuid = Convert.ToBase64String(guid.ToByteArray())
                .Replace("=", "")   // Remove padding characters
                .Replace("+", "")   // Remove special characters
                .Replace("/", "")   // Remove special characters
                .Substring(0, 12);  // Take the first 12 characters
            
            return shortGuid;
=======
            return "LifePadi" + sb.ToString();
>>>>>>> 7f9ad44 (done with payment and voucher)
        }
    }
}
