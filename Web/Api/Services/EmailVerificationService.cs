using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Net.Mime;
using System.Text;
using System.Threading.Tasks;
using Api.Interfaces;
using System.IO;

namespace Api.Services
{
    public class EmailVerificationService : IEmailVerification
    {
        private readonly IConfiguration _iconfig;
        private readonly ICustomer _icustomer;
        public EmailVerificationService(IConfiguration iconfig, ICustomer icustomer)
        {
            _iconfig = iconfig;
            _icustomer = icustomer;
        }
        public async Task SendEmailAsync(string to, string subject, string body)
        {
            try
            {
                var customer = await _icustomer.getByEmail(to);
                if (customer != null)
                {
                    throw new Exceptions.ServiceException("Email already exists");
                }
                
                using (var client = new System.Net.Mail.SmtpClient(_iconfig["SMTPConfig:Server"]))
                {
                    client.UseDefaultCredentials = false;
                    client.Credentials = new NetworkCredential(_iconfig["SMTPConfig:Username"], _iconfig["SMTPConfig:Password"]);
                    client.EnableSsl = true;
                    client.Port = Int32.Parse(_iconfig["SMTPConfig:Port"]!);

                    var message = new MailMessage(_iconfig["SMTPConfig:Username"]!, to)
                    {
                        From = new MailAddress(_iconfig["SMTPConfig:Username"]!, "LifePadi"),
                        Subject = subject,
                        Body = body,
                        BodyEncoding = Encoding.UTF8,
                        IsBodyHtml = true,
                    };

                    message.To.Add(to);

                    await client.SendMailAsync(message);
                }

            }
            catch (System.Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }
    }
}