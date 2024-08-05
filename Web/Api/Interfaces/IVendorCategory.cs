using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.DTO;
using Api.Models;
using Api.Services;

namespace Api.Interfaces
{
    public interface IVendorCategory
    {
        public Task<PagedList<VendorCategory>> allAsync( SearchPaging props );
        public Task<VendorCategoryDto> getAsync(int id);
        public Task<VendorCategoryDto> CreateAsync(CreateVendorCategoryDto vc);
        public Task<VendorCategoryDto> UpdateAsync(int id, CreateVendorCategoryDto vc);
        public Task<bool> DeleteAsync(int id);
        public Task<IEnumerable<VendorCategoryDto>> getAllVendors(int id);
    }
}
