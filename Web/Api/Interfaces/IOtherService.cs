using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.DTO;
using Api.Models;
using Api.Services;

namespace Api.Interfaces
{
    public interface IOtherService
    {
        string Strip(string type);
        public Task<object> GetYonkoDeliveryFee(Distance distance);
    Task<YonkoDeliveryDTO> CreateYonkoDelivery(CreateYonkoDeliveryDTO createYonkoDelivery);
    Task<YonkoDeliveryDTO?> UpdateYonkoDelivery(int id, CreateYonkoDeliveryDTO updateYonkoDelivery);
    Task<PagedList<YonkoDeliveryDTO>> GetAllYonkoDeliveries(SearchPaging props);
    Task<YonkoDeliveryDTO?> GetYonkoDelivery(int id);
    Task<bool> DeleteYonkoDelivery(int id);
    }
}