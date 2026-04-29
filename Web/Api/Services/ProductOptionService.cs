using Api.DTO;
using Api.Interfaces;
using Api.Models;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace Api.Services
{
    public class ProductOptionService : IProductOption
    {
        private readonly DBContext _db;
        private readonly IMapper _mapper;

        public ProductOptionService(DBContext db, IMapper mapper)
        {
            _db = db;
            _mapper = mapper;
        }

        // ---------------- Variants ----------------

        public async Task<IEnumerable<ProductVariantDto>> getVariantsByProduct(int productId)
        {
            var list = await _db.ProductVariants
                .Where(v => v.ProductId == productId)
                .OrderByDescending(v => v.IsDefault)
                .ThenBy(v => v.Price)
                .ToListAsync();
            return _mapper.Map<List<ProductVariantDto>>(list);
        }

        public async Task<ProductVariantDto> createVariant(CreateProductVariantDto dto)
        {
            var product = await _db.Products.FirstOrDefaultAsync(p => p.Id == dto.ProductId)
                ?? throw new Exceptions.ServiceException("Product not found");

            // Only one default variant per product
            if (dto.IsDefault)
            {
                var existingDefault = await _db.ProductVariants
                    .Where(v => v.ProductId == dto.ProductId && v.IsDefault)
                    .ToListAsync();
                foreach (var v in existingDefault) v.IsDefault = false;
            }

            var entity = _mapper.Map<ProductVariant>(dto);
            await _db.ProductVariants.AddAsync(entity);
            await _db.SaveChangesAsync();
            return _mapper.Map<ProductVariantDto>(entity);
        }

        public async Task<ProductVariantDto> updateVariant(int id, CreateProductVariantDto dto)
        {
            var entity = await _db.ProductVariants.FirstOrDefaultAsync(v => v.Id == id)
                ?? throw new Exceptions.ServiceException("Variant not found");

            if (dto.IsDefault && !entity.IsDefault)
            {
                var siblings = await _db.ProductVariants
                    .Where(v => v.ProductId == entity.ProductId && v.Id != id && v.IsDefault)
                    .ToListAsync();
                foreach (var v in siblings) v.IsDefault = false;
            }

            entity.Name = dto.Name;
            entity.Price = dto.Price;
            entity.IsDefault = dto.IsDefault;
            entity.UpdatedAt = DateTime.UtcNow;
            await _db.SaveChangesAsync();
            return _mapper.Map<ProductVariantDto>(entity);
        }

        public async Task<string> deleteVariant(int id)
        {
            var entity = await _db.ProductVariants.FirstOrDefaultAsync(v => v.Id == id);
            if (entity == null) return null!;
            _db.ProductVariants.Remove(entity);
            await _db.SaveChangesAsync();
            return "Variant deleted";
        }

        // ---------------- Extras ----------------

        public async Task<IEnumerable<ProductExtraDto>> getExtrasByProduct(int productId)
        {
            var list = await _db.ProductExtras
                .Where(e => e.ProductId == productId)
                .OrderBy(e => e.Price)
                .ToListAsync();
            return _mapper.Map<List<ProductExtraDto>>(list);
        }

        public async Task<ProductExtraDto> createExtra(CreateProductExtraDto dto)
        {
            var product = await _db.Products.FirstOrDefaultAsync(p => p.Id == dto.ProductId)
                ?? throw new Exceptions.ServiceException("Product not found");

            var entity = _mapper.Map<ProductExtra>(dto);
            await _db.ProductExtras.AddAsync(entity);
            await _db.SaveChangesAsync();
            return _mapper.Map<ProductExtraDto>(entity);
        }

        public async Task<ProductExtraDto> updateExtra(int id, CreateProductExtraDto dto)
        {
            var entity = await _db.ProductExtras.FirstOrDefaultAsync(e => e.Id == id)
                ?? throw new Exceptions.ServiceException("Extra not found");

            entity.Name = dto.Name;
            entity.Price = dto.Price;
            entity.UpdatedAt = DateTime.UtcNow;
            await _db.SaveChangesAsync();
            return _mapper.Map<ProductExtraDto>(entity);
        }

        public async Task<string> deleteExtra(int id)
        {
            var entity = await _db.ProductExtras.FirstOrDefaultAsync(e => e.Id == id);
            if (entity == null) return null!;
            _db.ProductExtras.Remove(entity);
            await _db.SaveChangesAsync();
            return "Extra deleted";
        }
    }
}
