using Api.DTO;

namespace Api.Interfaces
{
    public interface IVoucher
    {
<<<<<<< HEAD
        public Task<IEnumerable<VoucherDto>> allAsync();
        public Task<IEnumerable<VoucherDto>> allActiveAsync();
        public Task<VoucherDto> getAsync(int id);
        public Task<VoucherDto> createAsync(VoucherDto voucher);
        public Task<bool> isActive(int id);
        public Task<IEnumerable<VoucherDto>> getCurrentRunningVouchers();
        public Task<IEnumerable<VoucherDto>> searchWithName(string name);
        public Task<VoucherDto> searchWithCode(string voucherCode);
        public Task<IEnumerable<VoucherDto>> searchWithType(string voucherType);
=======
        public Task<IEnumerable<VoucherDTO>> allAsync();
        public Task<IEnumerable<VoucherDTO>> allActiveAsync();
        public Task<VoucherDTO> getAsync(int id);
        public Task<VoucherDTO> createAsync(VoucherDTO voucher);
        public Task<bool> isActive(int id);
        public Task<IEnumerable<VoucherDTO>> getCurrentRunningVouchers();
        public Task<IEnumerable<VoucherDTO>> searchWithName(string name);
        public Task<VoucherDTO> searchWithCode(string voucherCode);
        public Task<IEnumerable<VoucherDTO>> searchWithType(string voucherType);
>>>>>>> 7f9ad44 (done with payment and voucher)
        public Task<int> getNumberAvailableVoucher(int id);
        public Task<bool> checkIfExpired(int id);
        public Task<string> deactivateVoucher(int id);
        public Task<string> activateVoucher(int id);
<<<<<<< HEAD
        public Task<object> deleteAsync(int id);
        public Task<VoucherDto> updateAsync(VoucherDto voucher, int id);
        public Task<string> deactivateAllExpiredVouchers();
        public Task<string> expireALlPastDueDate();
        public Task<string> useVoucher(int id);
        public Task<int> totalNumberOfVouchers();
        public Task<int> totalNumberOfActiveVouchers();
        public Task<int> totalNumberOfNonActiveVouchers();
        public Task<object> voucherStats();
        public Task<object> useVoucherByCustomer(string voucherCode, int customerId);
        
=======
        public Task<string> deleteAsync(int id);
        public Task<VoucherDTO> updateAsync(VoucherDTO voucher, int id);
        public Task<string> deactivateAllExpiredVouchers();
        public Task<string> expireALlPastDueDate();
        public Task<string> useVoucher(int id);
>>>>>>> 7f9ad44 (done with payment and voucher)
    }
}
