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
using MimeKit;
using MailKit.Net.Smtp;

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

                    // Parse port safely with fallback
                    if (int.TryParse(_iconfig["SMTPConfig:Port"], out int smtpPort))
                    {
                        client.Port = smtpPort;
                    }
                    else
                    {
                        client.Port = 587; // Default SMTP port
                    }

                    var message = new MailMessage(_iconfig["SMTPConfig:Username"]!, to)
                    {
                        From = new MailAddress(_iconfig["SMTPConfig:Username"]!, "LifePadi"),
                        Subject = subject,
                        Body = body,
                        BodyEncoding = Encoding.UTF8,
                        IsBodyHtml = true,
                    };

                    // message.To.Add(to);

                    await client.SendMailAsync(message);
                }

            }
            catch (System.Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<object> SendVerificationEmail(string email)
        {
            try
            {
                int code = new Random().Next(1000, 9999);
                string Subject = "Lifepadi Email Verification";
                string Message = " <h1> Lifepadi Verification </h1> <br/> " +
                "<p> Your Lifepadi verification code is: </p> " +
                "<h2>" + code + "</h2> ";
                var emailMessage = new MimeMessage();
                emailMessage.From.Add(new MailboxAddress("LifePadi", "info@lifepadi.com"));
                emailMessage.To.Add(new MailboxAddress("", email));
                emailMessage.Subject = Subject;

                var bodyBuilder = new BodyBuilder { HtmlBody = Message };
                emailMessage.Body = bodyBuilder.ToMessageBody();

                using (var client = new MailKit.Net.Smtp.SmtpClient())
                {
                    client.Connect("smtp.zoho.com", 587, false);
                    client.Authenticate("info@lifepadi.com", "October@1992");

                    await client.SendAsync(emailMessage);
                    client.Disconnect(true);
                }
                var response = new
                {
                    code,
                    message = "Verification code sent successfully"
                };

                return response;

            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

    }
}