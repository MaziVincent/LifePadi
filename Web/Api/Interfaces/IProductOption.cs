using Api.DTO;

namespace Api.Interfaces
{
    public interface IProductOption
    {
        // Variants
        Task<IEnumerable<ProductVariantDto>> getVariantsByProduct(int productId);
        Task<ProductVariantDto> createVariant(CreateProductVariantDto dto);
        Task<ProductVariantDto> updateVariant(int id, CreateProductVariantDto dto);
        Task<string> deleteVariant(int id);

        // Extras
        Task<IEnumerable<ProductExtraDto>> getExtrasByProduct(int productId);
        Task<ProductExtraDto> createExtra(CreateProductExtraDto dto);
        Task<ProductExtraDto> updateExtra(int id, CreateProductExtraDto dto);
        Task<string> deleteExtra(int id);
    }
}
