using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.DTO;
using Api.Helpers;
using Api.Interfaces;
using Api.Models;
using AutoMapper;
using CloudinaryDotNet;
using Microsoft.EntityFrameworkCore;

namespace Api.Services
{
    public class VendorCategoryService : IVendorCategory
    {
        private readonly DBContext _context;
        private readonly IMapper _mapper;
        private readonly Cloudinary _cloudinary;
        private readonly IConfiguration _config;
        public VendorCategoryService(DBContext context, IMapper mapper, IConfiguration config)
        {
            _context = context;
            _mapper = mapper;
            _config = config;
            var account = new Account(
                _config["Cloudinary:Cloud_Name"],
                _config["Cloudinary:Api_Key"],
                _config["Cloudinary:Api_Secret"]
            );
            _cloudinary = new Cloudinary(account);
        }
        public async Task<PagedList<VendorCategory>> allAsync(SearchPaging props)
        {
            try
            {
                IQueryable<VendorCategory> categoryList = Enumerable.Empty<VendorCategory>().AsQueryable();

                if (props.SearchString is null)
                {
                    var categories1 = await _context.VendorCategories.OrderByDescending(c => c.CreatedAt).Include(v => v.Vendors)
                    .ToListAsync();
                    categoryList = categoryList.Concat(categories1);
                    var result = PagedList<VendorCategory>.ToPagedList(categoryList, props.PageNumber, props.PageSize);
                    return result;
                }
                var categories = await _context.VendorCategories.OrderByDescending(c => c.CreatedAt).Include(v => v.Vendors)
                    .Where(c => c.Name!.ToLower().Contains(props.SearchString!.ToLower()))
                    .ToListAsync();
                categoryList = categoryList.Concat(categories);
                var returned = PagedList<VendorCategory>.ToPagedList(categoryList, props.PageNumber, props.PageSize);
                return returned;
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<VendorCategoryDto> CreateAsync(CreateVendorCategoryDto vc)
        {
            try
            {
                string folderName = "VendorCategories";
                var vendorCategory = new VendorCategory
                {
                    Name = vc.Name,
                    Description = vc.Description,
                };
                var imgPath = await UploadImage.uploadImg(vc.Icon!, _cloudinary, folderName);
                if (imgPath == null!) throw new Exceptions.ServiceException("Can not upload the vendorCategory image");
                vendorCategory.IconUrl = imgPath;
                await _context.VendorCategories.AddAsync(vendorCategory);
                await _context.SaveChangesAsync();
                return _mapper.Map<VendorCategoryDto>(vendorCategory);
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
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
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<PagedList<VendorDtoLite>> getAllVendors(int id, SearchPaging props)
        {
            IQueryable<VendorDtoLite> vendorsList = Enumerable.Empty<VendorDtoLite>().AsQueryable();

            try
            {
                var vendors = await _context.Vendors.Include(v => v.Addresses)
                .Where(v => v.VendorCategoryId == id)
                .AsSplitQuery()
                .ToListAsync();
                if (vendors == null)
                {
                    return null!;
                }
                var vendorsDto = _mapper.Map<List<VendorDtoLite>>(vendors);
                vendorsList = vendorsList.Concat(vendorsDto);
                var result = PagedList<VendorDtoLite>.ToPagedList(vendorsList, props.PageNumber, props.PageSize);
                return result;
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<VendorCategoryDto> getAsync(int id)
        {
            try
            {
                var vendorCategory = await _context.VendorCategories.Where(v => v.Id == id)
                .Include(v => v.Vendors).FirstOrDefaultAsync();

                if (vendorCategory == null)
                {
                    return null!;
                }
                var vendorCategoryDto = _mapper.Map<VendorCategoryDto>(vendorCategory);
                return vendorCategoryDto;
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<VendorCategoryDto> UpdateAsync(int id, CreateVendorCategoryDto vc)
        {
            try
            {
                string folderName = "VendorCategory";
                var initialVendorCategory = await _context.VendorCategories.FirstOrDefaultAsync(v => v.Id == id);
                if (initialVendorCategory == null)
                {
                    return null!;
                }
                if (vc.Icon != null)
                {
                    var imgPath = await UploadImage.uploadImg(vc.Icon, _cloudinary, folderName);
                    if (imgPath == null!) throw new Exceptions.ServiceException("Can not upload the vendorCategory image");
                    initialVendorCategory.IconUrl = imgPath;
                }
                initialVendorCategory.Name = vc.Name;
                initialVendorCategory.Description = vc.Description;
                initialVendorCategory.UpdatedAt = DateTime.UtcNow;
                _context.VendorCategories.Attach(initialVendorCategory);
                await _context.SaveChangesAsync();
                var vendorCategoryDto = _mapper.Map<VendorCategoryDto>(initialVendorCategory);
                return vendorCategoryDto;
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }
    }
}