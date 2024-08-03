using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;

namespace Api.Services
{
    public class GoogleMapService
    {
        private readonly HttpClient _httpClient;
        private IConfiguration _config;

        public GoogleMapService(HttpClient httpClient, IConfiguration config)   
        {
            _httpClient = httpClient;
            _config = config;
        }

        
        
    }
}