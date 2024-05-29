using Api.DTO;
using Api.Helpers;
using Api.Interfaces;
using Api.Models;
using AutoMapper;
using Bogus.DataSets;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Globalization;

namespace Api.Services
{
    public class VoucherService : IVoucher
    {
        private readonly DBContext _dbContext;
        private readonly IMapper _mapper;

        public VoucherService(DBContext dBContext, IMapper mapper)
        {
            _dbContext = dBContext;
            _mapper = mapper;

        }

        public async Task<string> activateVoucher(int id)
        {
            try
            {
                var voucher = await _dbContext.Vouchers.FirstOrDefaultAsync(v => v.Id == id);
                if (voucher == null) return null!;
                voucher.IsActive = true;
                voucher.UpdatedAt = DateTime.UtcNow;
                _dbContext.Vouchers.Attach(voucher);
                await _dbContext.SaveChangesAsync();
                return "Voucher activated";
            }catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<IEnumerable<VoucherDTO>> allActiveAsync()
        {
            try
            {
                var vouchers = await _dbContext.Vouchers
                    .Where(v => v.IsActive == true)
                    .OrderByDescending(v => v.CreatedAt)
                    .ToListAsync();
                var voucherList = _mapper.Map<List<VoucherDTO>>(vouchers);
                return voucherList;
            }catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<IEnumerable<VoucherDTO>> allAsync()
        {
            try
            {
                var vouchers = await _dbContext.Vouchers
                    .OrderByDescending(v => v.CreatedAt)
                    .ToListAsync();
                var voucherList = _mapper.Map<List<VoucherDTO>>(vouchers);
                return voucherList;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<bool> checkIfExpired(int id)
        {
            try
            {
                var voucher = await _dbContext.Vouchers.FirstOrDefaultAsync(v => v.Id == id);
                if (voucher == null) throw new Exception("Voucher not found");
                int comparismResult = DateTime.Compare(DateTime.Now, (DateTime)voucher.EndDate!);
                if (comparismResult == 0)
                {
                    return true;
                }else if(comparismResult < 0)
                {
                    return false;
                }else
                {
                    return true;
                }
            }catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<VoucherDTO> createAsync(VoucherDTO voucher)
        {
            try
            {
                var newVoucher = _mapper.Map<Voucher>(voucher);
                newVoucher.Code = GenerateCode.GenerateRandomString();
                newVoucher.IsActive = true;
                newVoucher.IsExpired = false;
                string str_startDate = voucher.StartDate.ToString()!;
                string str_endDate = voucher.EndDate.ToString()!;
                // Remove the StarDate and EndDate values when the data is coming from the frontend and not postman
                DateTime startDate = DateTime.ParseExact(str_startDate, "M/d/yyyy h:mm:ss tt", CultureInfo.InvariantCulture);
                DateTime endDate = DateTime.ParseExact(str_endDate, "M/d/yyyy h:mm:ss tt", CultureInfo.InvariantCulture);
                if (startDate.Kind == DateTimeKind.Unspecified)
                    startDate = DateTime.SpecifyKind(startDate, DateTimeKind.Utc);
                if (endDate.Kind == DateTimeKind.Unspecified)
                    endDate = DateTime.SpecifyKind(endDate, DateTimeKind.Utc);
                newVoucher.StartDate = startDate;
                newVoucher.EndDate = endDate;
                await _dbContext.Vouchers.AddAsync(newVoucher);
                await _dbContext.SaveChangesAsync();
                var voucherDTO = _mapper.Map<VoucherDTO>(newVoucher);
                return voucherDTO;
            }catch(Exception ex) 
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<string> deactivateAllExpiredVouchers()
        {
            try
            {
                var expiredVouchers = await _dbContext.Vouchers
                    .Where(v => (v.IsExpired == true) && (v.IsActive == true))
                    .ToListAsync();
                if (expiredVouchers.IsNullOrEmpty()) throw new Exception("No active expired voucher found");
                foreach (var item in expiredVouchers)
                {
                    item.IsActive = false;
                    item.UpdatedAt = DateTime.UtcNow;
                }
                _dbContext.Vouchers.AttachRange(expiredVouchers);
                await _dbContext.SaveChangesAsync();
                return "All Expired vouchers deactivated";
            }catch(Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<string> deactivateVoucher(int id)
        {
            try
            {
                var voucher = await _dbContext.Vouchers.FirstOrDefaultAsync(v => v.Id == id);
                if (voucher == null) return null!;
                voucher.IsActive = false;
                voucher.UpdatedAt = DateTime.UtcNow;
                _dbContext.Vouchers.Attach(voucher);
                await _dbContext.SaveChangesAsync();
                return "Voucher deactivated";
            }catch(Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<string> deleteAsync(int id)
        {
            try
            {
                var voucher = await _dbContext.Vouchers.FirstOrDefaultAsync(v => v.Id == id);
                if (voucher == null) return null!;
                _dbContext.Vouchers.Remove(voucher);
                await _dbContext.SaveChangesAsync();
                return "Voucher deleted";
            }catch(Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<string> expireALlPastDueDate()
        {
            try
            {
                var expiredVouchers = await _dbContext.Vouchers
                    .Where(v => v.EndDate < DateTime.UtcNow && v.IsExpired == false)
                    .ToListAsync();
                if (expiredVouchers == null) throw new Exception("No active expired voucher found");
                expiredVouchers.ForEach(v =>
                {
                    v.IsExpired = true;
                    v.Status = "Expired";
                    v.UpdatedAt = DateTime.UtcNow;
                });
                
                _dbContext.Vouchers.AttachRange(expiredVouchers);
                await _dbContext.SaveChangesAsync();
                return "All Expired vouchers deactivated";
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<VoucherDTO> getAsync(int id)
        {
            try
            {
                var voucher = await _dbContext.Vouchers.FirstOrDefaultAsync(v => v.Id == id);
                if (voucher == null) return null!;
                var voucherDTO = _mapper.Map<VoucherDTO>(voucher);

                return voucherDTO;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<IEnumerable<VoucherDTO>> getCurrentRunningVouchers()
        {
            try
            {
                var vouchers = await _dbContext.Vouchers
                    .OrderByDescending(v => v.CreatedAt)
                    .Where(v => v.IsExpired == false && v.IsActive == true)
                    .ToListAsync();
                var voucherDTOList = _mapper.Map<List<VoucherDTO>>(vouchers);
                return voucherDTOList;
            }catch(Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<int> getNumberAvailableVoucher(int id)
        {
            try
            {
                var voucher = await _dbContext.Vouchers
                    .FirstOrDefaultAsync(v => v.Id == id);
                if (voucher == null) throw new Exception("Voucher not found");
                int num = (int)voucher.TotalNumberAvailable! - (int)voucher.TotalNumberUsed!;
                return num;
            }catch(Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<bool> isActive(int id)
        {
            try
            {
                var voucher = await _dbContext.Vouchers
                    .FirstOrDefaultAsync(v => v.Id == id);
                if (voucher == null) throw new Exception("Voucher not found");
                if(voucher.IsActive == true) return true;
                return false;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<VoucherDTO> searchWithCode(string voucherCode)
        {
            try
            {
                var voucher = await _dbContext.Vouchers
                    .FirstOrDefaultAsync(v => v.Code!.ToLower() == voucherCode.ToLower());
                if (voucher == null) return null!;
                var voucherDTO = _mapper.Map<VoucherDTO>(voucher);
                return voucherDTO;
            }catch(Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<IEnumerable<VoucherDTO>> searchWithName(string name)
        {
            try
            {
                var voucher = await _dbContext.Vouchers
                    .Where(v => v.Name!.ToLower().Contains(name.ToLower()))
                    .ToListAsync();
                var voucherDTO = _mapper.Map<List<VoucherDTO>>(voucher);
                return voucherDTO;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<IEnumerable<VoucherDTO>> searchWithType(string voucherType)
        {
            try
            {
                var voucher = await _dbContext.Vouchers
                    .Where(v => v.Name!.ToLower().Contains(voucherType.ToLower()))
                    .ToListAsync();
                var voucherDTO = _mapper.Map<List<VoucherDTO>>(voucher);
                return voucherDTO;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<VoucherDTO> updateAsync(VoucherDTO voucher, int id)
        {
            try
            {
                var initialVoucher = await _dbContext.Vouchers.FirstOrDefaultAsync(v => v.Id == id);
                if (initialVoucher is null) return null!;
                initialVoucher.Status = voucher.Status;
                initialVoucher.DiscountPercentage = voucher.DiscountPercentage;
                initialVoucher.Name = voucher.Name;
                initialVoucher.Description = voucher.Description;
                initialVoucher.IsActive = voucher.IsActive;
                initialVoucher.IsExpired = voucher.IsExpired;
                initialVoucher.StartDate = voucher.StartDate;
                initialVoucher.EndDate = voucher.EndDate;
                initialVoucher.UpdatedAt = DateTime.UtcNow;
                _dbContext.Vouchers.Attach(initialVoucher);
                await _dbContext.SaveChangesAsync();
                var voucherDTO = _mapper.Map<VoucherDTO>(initialVoucher);
                return voucherDTO;
            }catch(Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<string> useVoucher(int id)
        {
            try
            {
                var voucher = await _dbContext.Vouchers
                    .FirstOrDefaultAsync(v => v.Id == id);
                if (voucher is null) return null!;
                if ((bool)voucher.IsExpired!) throw new Exception("Voucher expired");
                if ((bool)!voucher.IsActive!) throw new Exception("Voucher not active");
                if (voucher.TotalNumberAvailable <= voucher.TotalNumberUsed) throw new Exception("Voucher exhausted");
                voucher.TotalNumberUsed += 1;
                voucher.UpdatedAt = DateTime.UtcNow;
                _dbContext.Vouchers.Attach(voucher);
                await _dbContext.SaveChangesAsync();
                return "Successful";

            }catch(Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
