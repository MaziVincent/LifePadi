<<<<<<< HEAD
﻿using System.Numerics;
using System.Text;
=======
﻿using System.Text;
>>>>>>> 7f9ad44 (done with payment and voucher)

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
<<<<<<< HEAD

        public static BigInteger genTxId()
        {
            Random random = new Random();
            const string chars = "0123456789";
            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < 10; i++)
            {
                sb.Append(chars[random.Next(chars.Length)]);
            }

            return BigInteger.Parse(sb.ToString());
        }
=======
>>>>>>> 7f9ad44 (done with payment and voucher)
    }
}
