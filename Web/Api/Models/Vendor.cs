namespace Api.Models
{
    public class Vendor: User
    {
        public Vendor(): base() { }
        public string? Name { get; set; }
        public string? VendorType { get; set; }
        public string? VendorImgUrl { get; set; }
        public List<Product>? Products { get; set; }
    }
}
