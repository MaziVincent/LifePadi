using System;
using Api.DTO;
using Api.Interfaces;
using Api.Models;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
<<<<<<< HEAD
<<<<<<< HEAD
using MailKit.Net.Smtp;
using MimeKit;
=======
>>>>>>> 9391cc8 (faq, customer support and term)
=======
using MailKit.Net.Smtp;
using MimeKit;
>>>>>>> 6b6a266 (search commit)

namespace Api.Services
{
    public class CustomerSupportService : ICustomerSupport
    {
        private readonly DBContext _dbContext;
        private readonly IMapper _mapper;

        public CustomerSupportService(DBContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public async Task<IEnumerable<CustomerSupportDto>> allAsync()
        {
            try
            {
                var supports = await _dbContext.CustomerSupports
                    .Include(c => c.Customer)
                    .OrderByDescending(a => a.CreatedAt).ToListAsync();
                var customerSupports = _mapper.Map<List<CustomerSupportDto>>(supports);
                return customerSupports;
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<string> createAsync(CustomerSupportDto support)
        {

            try
            {
                
                var newSupport = _mapper.Map<CustomerSupport>(support);
                await _dbContext.CustomerSupports.AddAsync(newSupport);
                await _dbContext.SaveChangesAsync();
                return "Message sent Successfully";
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 6b6a266 (search commit)

        public async Task<string> SendEmailAsync(EmailDto email)
        {
            try
            {
            var emailMessage = new MimeMessage();
            emailMessage.From.Add(new MailboxAddress("Life Padi Support", "info@lifepadi.com"));
            emailMessage.To.Add(new MailboxAddress("", "primeobjective20@gmail.com"));
            emailMessage.Subject = email.Subject;

            var bodyBuilder = new BodyBuilder { HtmlBody = email.Message };
            emailMessage.Body = bodyBuilder.ToMessageBody();

            using (var client = new SmtpClient())
            {
                client.Connect("smtp.zoho.com", 587, false);
                client.Authenticate("info@lifepadi.com", "October@1992");

                await client.SendAsync(emailMessage);
                client.Disconnect(true);
            }

            return "Support Message Sent Successfully";
            }
            catch (Exception ex)
            {
            throw new Exceptions.ServiceException(ex.Message);
            }
        }
<<<<<<< HEAD
=======
>>>>>>> 9391cc8 (faq, customer support and term)
=======
>>>>>>> 6b6a266 (search commit)
    }
}