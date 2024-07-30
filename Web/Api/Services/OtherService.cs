using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Interfaces;

namespace Api.Services
{
    public class OtherService : IOtherService
    {
         public string Strip(string type){

            var retype = type.Substring(type.LastIndexOf('.') + 1);
            return retype;
        }
    }
}