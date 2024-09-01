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
            return "LifePadi" + sb.ToString();
        }

        public string generateVerificationCode()
        {
            string[] newNum = new string[6];
            Random random = new Random();

            for (int i = 0; i < 6; i++)
            {
                newNum[i] = random.Next(10).ToString();
            }
            string codeRand = string.Join("", newNum);
            return (codeRand);
        }
    }
}
