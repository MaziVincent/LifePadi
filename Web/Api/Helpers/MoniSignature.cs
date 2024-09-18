using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Security.Cryptography;
using System.Text;

namespace Api.Helpers
{
    public class MoniSignature
    {
        public static string GenerateSignature(string secretKey, string digest)
        {
            byte[] keyBytes = Encoding.UTF8.GetBytes(secretKey);
            byte[] digestBytes = Encoding.UTF8.GetBytes(digest);

            using (var hmac = new HMACSHA256(keyBytes))
            {
                byte[] signatureBytes = hmac.ComputeHash(digestBytes);
                string signature = BitConverter.ToString(signatureBytes).Replace("-", "").ToLower();
                return signature;
            }
        }

        public static string GetSignature(IConfiguration _config)
        {
            string merchantKey = _config["Bani:Merchant_Key"]!;
            string tribeAccountRef = _config["Bani:Account_Tribe_Ref"]!;
            string publicKey = _config["Bani:Public_Key"]!;

            string digest = $"{tribeAccountRef}{publicKey}";

            string signature = GenerateSignature(merchantKey, digest);

            return signature;
        }
    }
}
