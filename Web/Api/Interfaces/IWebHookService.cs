using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Models;
using Api.DTO;

namespace Api.Interfaces
{
    public interface IWebHookService
    {
        Task<bool> ValidateSignature(string payload, string signature);
        Task ProcessWebhookEvent(PaystackWebhookEvent paystackEvent);
        Task ProcessOrderPayment(PaystackVerificationData data);
        Task ProcessWalletDeposit(PaystackVerificationData data);

    }
}