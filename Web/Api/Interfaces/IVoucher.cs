using Api.DTO;

namespace Api.Interfaces
{
    public interface IVoucher
    {
        public Task<IEnumerable<VoucherDTO>> allAsync();
        public Task<IEnumerable<VoucherDTO>> allActiveAsync();
        public Task<VoucherDTO> getAsync(int id);
        public Task<VoucherDTO> createAsync(VoucherDTO voucher);
        public Task<bool> isActive(int id);
        public Task<IEnumerable<VoucherDTO>> getCurrentRunningVouchers();
        public Task<IEnumerable<VoucherDTO>> searchWithName(string name);
        public Task<VoucherDTO> searchWithCode(string voucherCode);
        public Task<IEnumerable<VoucherDTO>> searchWithType(string voucherType);
        public Task<int> getNumberAvailableVoucher(int id);
        public Task<bool> checkIfExpired(int id);
        public Task<string> deactivateVoucher(int id);
        public Task<string> activateVoucher(int id);
        public Task<string> deleteAsync(int id);
        public Task<VoucherDTO> updateAsync(VoucherDTO voucher, int id);
        public Task<string> deactivateAllExpiredVouchers();
        public Task<string> expireALlPastDueDate();
        public Task<string> useVoucher(int id);
    }
}
