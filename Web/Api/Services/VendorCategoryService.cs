using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.DTO;
using Api.Interfaces;
using Api.Models;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace Api.Services
{
    public class VendorCategoryService : IVendorCategory
    {
        private readonly DBContext _context;
        private readonly IMapper _mapper;
        const string errorMessage = "An error occurred while processing the request.";
        public VendorCategoryService(DBContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<IEnumerable<VendorCategoryDto>> allAsync()
        {
            try
            {
                var vendorCategories = await _context.VendorCategories.ToListAsync();
                var vendorCategoriesDto = _mapper.Map<IEnumerable<VendorCategoryDto>>(vendorCategories);
                return vendorCategoriesDto;
            }
            catch (InvalidOperationException ex)
            {
                throw new InvalidOperationException(errorMessage, ex);
            }
        }

        public async Task<VendorCategoryDto> CreateAsync(VendorCategoryDto vc)
        {
            try
            {
                var vendorCategory = _mapper.Map<VendorCategory>(vc);
                await _context.VendorCategories.AddAsync(vendorCategory);
                await _context.SaveChangesAsync();
                return _mapper.Map<VendorCategoryDto>(vendorCategory);
            }
            catch (InvalidOperationException ex)
            {
                throw new InvalidOperationException(errorMessage, ex);
            }
        }

        public async Task<bool> DeleteAsync(int id)
        {
            try
            {
                var vendorCategory = await _context.VendorCategories.FindAsync(id);
                if (vendorCategory == null)
                {
                    return false;
                }
                _context.VendorCategories.Remove(vendorCategory);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (InvalidOperationException ex)
            {
                throw new InvalidOperationException(errorMessage, ex);
            }
        }

        public async Task<IEnumerable<VendorCategoryDto>> getAllVendors(int id)
        {
            try
            {
                var vendorCategory = await _context.VendorCategories.Include(v => v.Vendors).FirstOrDefaultAsync(v => v.Id == id);
                if (vendorCategory == null)
                {
                    return null!;
                }
                var vendors = vendorCategory.Vendors;
                var vendorCategoryDtos = _mapper.Map<IEnumerable<VendorCategoryDto>>(vendors);
                return vendorCategoryDtos;
            }
            catch (InvalidOperationException ex)
            {
                throw new InvalidOperationException(errorMessage, ex);
            }
        }

        public async Task<VendorCategoryDto> getAsync(int id)
        {
            try
            {
                var vendorCategory = await _context.VendorCategories
                .Include(v => v.Vendors).FirstOrDefaultAsync(v => v.Id == id);

                if (vendorCategory == null)
                {
                    return null!;
                }
                var vendorCategoryDto = _mapper.Map<VendorCategoryDto>(vendorCategory);
                return vendorCategoryDto;
            }
            catch (InvalidOperationException ex)
            {
                throw new InvalidOperationException(errorMessage, ex);
            }
        }

        public async Task<VendorCategoryDto> UpdateAsync(int id, VendorCategory vc)
        {
            try
            {
                var initialVendorCategory = await _context.VendorCategories.FirstOrDefaultAsync(v => v.Id == id);
                if (initialVendorCategory == null)
                {
                    return null!;
                }
                initialVendorCategory.Name = vc.Name;
                initialVendorCategory.Description = vc.Description;
                initialVendorCategory.UpdatedAt = DateTime.UtcNow;
                _context.VendorCategories.Attach(initialVendorCategory);
                await _context.SaveChangesAsync();
                var vendorCategoryDto = _mapper.Map<VendorCategoryDto>(initialVendorCategory);
                return vendorCategoryDto;
            }
            catch (InvalidOperationException ex)
            {
                throw new InvalidOperationException(errorMessage, ex);
            }
        }

        public async Task<VendorCategoryDto> UpdateAsync(int id, VendorCategoryDto vc)
        {
            try
            {
                var initialVendorCategory = await _context.VendorCategories.FirstOrDefaultAsync(v => v.Id == id);
                if (initialVendorCategory == null)
                {
                    return null!;
                }
                initialVendorCategory.UpdatedAt = DateTime.UtcNow;
                initialVendorCategory.Name = vc.Name;
                initialVendorCategory.Description = vc.Description;
                _context.VendorCategories.Attach(initialVendorCategory);
                await _context.SaveChangesAsync();
                var vendorCategoryDto = _mapper.Map<VendorCategoryDto>(initialVendorCategory);
                return vendorCategoryDto;
            }
            catch (InvalidOperationException ex)
            {
                throw new InvalidOperationException(errorMessage, ex);
            }
        }
    }
}