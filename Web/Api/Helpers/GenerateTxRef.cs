using System.Text;

namespace Api.Helpers
{
    public class GenerateTxRef
    {
        public static string genTx_rf()
        {
            Random random = new Random();
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < 10; i++)
            {
                sb.Append(chars[random.Next(chars.Length)]);
            }

            return "LifePadi-" + sb.ToString();
        }
    }
}
