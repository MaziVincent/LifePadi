using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace Api.Helpers
{
    public class SendOtp
    {
        private readonly IConfiguration _config;
        private readonly HttpClient _httpClient;
        public SendOtp(IConfiguration config, HttpClient httpClient)
        {
            _config = config;
            _httpClient = httpClient;
        }

        public async Task<string> sendOtp(string phoneNumber)
        {
            try
            {
                // Check if the number starts with '0'
                if (phoneNumber.StartsWith("0"))
                {
                    // Remove the first character ('0') and prepend '234'
                     phoneNumber = string.Concat("234", phoneNumber.AsSpan(1));
                    
                }

                if (phoneNumber.StartsWith("+"))
                {
                    phoneNumber = phoneNumber.Replace("+", "");
                }
                var requestUri = _config["Termii:SendOtp_Url"]; // Termii API endpoint for sending SMS

                var payload = new
                {
                    to = phoneNumber,
                    from = Environment.GetEnvironmentVariable("TERMII_SENDER_ID") ?? _config["Termii:Sender_Id"],
                    message_type = "NUMERIC",
                    channel = "dnd",
                    api_key = Environment.GetEnvironmentVariable("TERMII_API_KEY") ?? _config["Termii:Api_Key"],
                    pin_length = 4,
                    pin_placeholder = "< 1234 >",
                    message_text = "Your Lifepadi verification code is < 1234 >, it will expire in 5 minutes",
                    pin_attempts = 3,
                    pin_time_to_live = 5,
                    pin_type = "NUMERIC"
                };
                var jsonPayload = JsonConvert.SerializeObject(payload);
                var content = new StringContent(jsonPayload, Encoding.UTF8, "application/json");

                var response = await _httpClient.PostAsync(requestUri, content);
                if (response.IsSuccessStatusCode)
                {
                    return await response.Content.ReadAsStringAsync();
                }

                throw new Exceptions.ServiceException(response.ReasonPhrase!);
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }
    }
}