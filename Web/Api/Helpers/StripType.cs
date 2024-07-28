using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Helpers
{
    public class StripType
    {
        public string Strip(string type)
        {

            var retype = type.Substring(type.LastIndexOf('.') + 1);
            return retype;
        }
    }
}