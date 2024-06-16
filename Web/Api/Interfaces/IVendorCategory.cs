using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.DTO;

namespace Api.Interfaces
{
    public interface IVendorCategory
    {
        public Task<IEnumerable<VendorCategoryDto>> allAsync();
        public Task<VendorCategoryDto> getAsync(int id);
        public Task<VendorCategoryDto> CreateAsync(VendorCategoryDto vc);
        public Task<VendorCategoryDto> UpdateAsync(int id, VendorCategoryDto vc);
        public Task<bool> DeleteAsync(int id);
        public Task<IEnumerable<VendorCategoryDto>> getAllVendors(int id);
    }
}
