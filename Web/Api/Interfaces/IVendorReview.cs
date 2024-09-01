using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.DTO;

namespace Api.Interfaces
{
    public interface IVendorReview
    {
        public Task<List<VendorReviewDto>> allAsync();
        public Task<VendorReviewDto> findAsync(int id);
        public Task<VendorReviewDto> createAsync(VendorReviewDto vendorReviewDto);
        public Task<VendorReviewDto> updateAsync(int id, VendorReviewDto vendorReviewDto);
        public Task<string> deleteAsync(int id);
        public Task<List<VendorReviewDto>> allByVendorAsync(int vendorId);
        public Task<double> averageRating(int vendorId);
        public Task<object> vendorReviewStats(int vendorId);
    }
}