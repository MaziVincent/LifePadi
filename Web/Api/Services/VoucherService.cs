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
<<<<<<< HEAD
        private readonly ICustomerVoucher _customerVoucher;

        public VoucherService(DBContext dBContext, IMapper mapper, ICustomerVoucher customerVoucher)
        {
            _dbContext = dBContext;
            _mapper = mapper;
            _customerVoucher = customerVoucher;
=======

        public VoucherService(DBContext dBContext, IMapper mapper)
        {
            _dbContext = dBContext;
            _mapper = mapper;
>>>>>>> 7f9ad44 (done with payment and voucher)

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
<<<<<<< HEAD
<<<<<<< HEAD
            }
            catch (Exception ex)
=======
            }catch (Exception ex)
>>>>>>> 7f9ad44 (done with payment and voucher)
=======
            }
            catch (Exception ex)
>>>>>>> 98415b4 (done with dashboard)
            {
                throw new Exception(ex.Message);
            }
        }

<<<<<<< HEAD
<<<<<<< HEAD
        public async Task<IEnumerable<VoucherDto>> allActiveAsync()
=======
        public async Task<IEnumerable<VoucherDTO>> allActiveAsync()
>>>>>>> 7f9ad44 (done with payment and voucher)
=======
        public async Task<IEnumerable<VoucherDto>> allActiveAsync()
>>>>>>> 836ec36 (changed all DTO to Dto)
        {
            try
            {
                var vouchers = await _dbContext.Vouchers
                    .Where(v => v.IsActive == true)
                    .OrderByDescending(v => v.CreatedAt)
                    .ToListAsync();
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 836ec36 (changed all DTO to Dto)
                var voucherList = _mapper.Map<List<VoucherDto>>(vouchers);
                return voucherList;
            }
            catch (Exception ex)
=======
                var voucherList = _mapper.Map<List<VoucherDTO>>(vouchers);
                return voucherList;
<<<<<<< HEAD
            }catch (Exception ex)
>>>>>>> 7f9ad44 (done with payment and voucher)
=======
            }
            catch (Exception ex)
>>>>>>> 98415b4 (done with dashboard)
            {
                throw new Exception(ex.Message);
            }
        }

<<<<<<< HEAD
<<<<<<< HEAD
        public async Task<IEnumerable<VoucherDto>> allAsync()
=======
        public async Task<IEnumerable<VoucherDTO>> allAsync()
>>>>>>> 7f9ad44 (done with payment and voucher)
=======
        public async Task<IEnumerable<VoucherDto>> allAsync()
>>>>>>> 836ec36 (changed all DTO to Dto)
        {
            try
            {
                var vouchers = await _dbContext.Vouchers
                    .OrderByDescending(v => v.CreatedAt)
                    .ToListAsync();
<<<<<<< HEAD
<<<<<<< HEAD
                var voucherList = _mapper.Map<List<VoucherDto>>(vouchers);
=======
                var voucherList = _mapper.Map<List<VoucherDTO>>(vouchers);
>>>>>>> 7f9ad44 (done with payment and voucher)
=======
                var voucherList = _mapper.Map<List<VoucherDto>>(vouchers);
>>>>>>> 836ec36 (changed all DTO to Dto)
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
<<<<<<< HEAD
<<<<<<< HEAD
                }
                else if (comparismResult < 0)
                {
                    return false;
                }
                else
                {
                    return true;
                }
            }
            catch (Exception ex)
=======
                }else if(comparismResult < 0)
=======
                }
                else if (comparismResult < 0)
>>>>>>> 98415b4 (done with dashboard)
                {
                    return false;
                }
                else
                {
                    return true;
                }
<<<<<<< HEAD
            }catch (Exception ex)
>>>>>>> 7f9ad44 (done with payment and voucher)
=======
            }
            catch (Exception ex)
>>>>>>> 98415b4 (done with dashboard)
            {
                throw new Exception(ex.Message);
            }
        }

<<<<<<< HEAD
<<<<<<< HEAD
        public async Task<VoucherDto> createAsync(VoucherDto voucher)
=======
        public async Task<VoucherDTO> createAsync(VoucherDTO voucher)
>>>>>>> 7f9ad44 (done with payment and voucher)
=======
        public async Task<VoucherDto> createAsync(VoucherDto voucher)
>>>>>>> 836ec36 (changed all DTO to Dto)
        {
            try
            {
                var newVoucher = _mapper.Map<Voucher>(voucher);
                newVoucher.Code = GenerateCode.GenerateRandomString();
                newVoucher.IsActive = true;
                newVoucher.IsExpired = false;
<<<<<<< HEAD
                // string str_startDate = voucher.StartDate.ToString()!;
                // string str_endDate = voucher.EndDate.ToString()!;
                // Remove the StarDate and EndDate values when the data is coming from the frontend and not postman
                // DateTime startDate = DateTime.ParseExact(str_startDate, "M/d/yyyy h:mm:ss tt", CultureInfo.InvariantCulture);
                // DateTime endDate = DateTime.ParseExact(str_endDate, "M/d/yyyy h:mm:ss tt", CultureInfo.InvariantCulture);
                // if (startDate.Kind == DateTimeKind.Unspecified)
                //     startDate = DateTime.SpecifyKind(startDate, DateTimeKind.Utc);
                // if (endDate.Kind == DateTimeKind.Unspecified)
                //     endDate = DateTime.SpecifyKind(endDate, DateTimeKind.Utc);
                // newVoucher.StartDate = startDate;
                // newVoucher.EndDate = endDate;
                DateTime startDate = DateTime.SpecifyKind(voucher.StartDate, DateTimeKind.Utc);
                DateTime endDate = DateTime.SpecifyKind(voucher.EndDate, DateTimeKind.Utc);
                newVoucher.StartDate = startDate;
                newVoucher.EndDate = endDate;
                newVoucher.Type = "Discount";
                newVoucher.Status = "NotUsed";
                await _dbContext.Vouchers.AddAsync(newVoucher);
                await _dbContext.SaveChangesAsync();
                var VoucherDto = new VoucherDto{
                    Id = newVoucher.Id,
                    Name = newVoucher.Name,
                    Description = newVoucher.Description,
                    Code = newVoucher.Code,
                    Type = newVoucher.Type,
                    IsActive = newVoucher.IsActive,
                    IsExpired = newVoucher.IsExpired,
                    TotalNumberAvailable = newVoucher.TotalNumberAvailable,
                    TotalNumberUsed = newVoucher.TotalNumberUsed,
                    StartDate = newVoucher.StartDate,
                    EndDate = newVoucher.EndDate,
                    DiscountPercentage = newVoucher.DiscountPercentage,
                    DiscountAmount = newVoucher.DiscountAmount,
                    Status = newVoucher.Status,
                };

                return VoucherDto;
            }
            catch (Exception ex)
=======
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
<<<<<<< HEAD
                var voucherDTO = _mapper.Map<VoucherDTO>(newVoucher);
                return voucherDTO;
<<<<<<< HEAD
            }catch(Exception ex) 
>>>>>>> 7f9ad44 (done with payment and voucher)
=======
=======
                var VoucherDto = _mapper.Map<VoucherDto>(newVoucher);
                return VoucherDto;
>>>>>>> 836ec36 (changed all DTO to Dto)
            }
            catch (Exception ex)
>>>>>>> 98415b4 (done with dashboard)
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
<<<<<<< HEAD
<<<<<<< HEAD
            }
            catch (Exception ex)
=======
            }catch(Exception ex)
>>>>>>> 7f9ad44 (done with payment and voucher)
=======
            }
            catch (Exception ex)
>>>>>>> 98415b4 (done with dashboard)
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
<<<<<<< HEAD
<<<<<<< HEAD
            }
            catch (Exception ex)
=======
            }catch(Exception ex)
>>>>>>> 7f9ad44 (done with payment and voucher)
=======
            }
            catch (Exception ex)
>>>>>>> 98415b4 (done with dashboard)
            {
                throw new Exception(ex.Message);
            }
        }

<<<<<<< HEAD
        public async Task<object> deleteAsync(int id)
=======
        public async Task<string> deleteAsync(int id)
>>>>>>> 7f9ad44 (done with payment and voucher)
        {
            try
            {
                var voucher = await _dbContext.Vouchers.FirstOrDefaultAsync(v => v.Id == id);
                if (voucher == null) return null!;
                _dbContext.Vouchers.Remove(voucher);
                await _dbContext.SaveChangesAsync();
<<<<<<< HEAD
                return new {success = "Voucher deleted"};
            }
            catch (Exception ex)
=======
                return "Voucher deleted";
<<<<<<< HEAD
            }catch(Exception ex)
>>>>>>> 7f9ad44 (done with payment and voucher)
=======
            }
            catch (Exception ex)
>>>>>>> 98415b4 (done with dashboard)
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
<<<<<<< HEAD
<<<<<<< HEAD

=======
                
>>>>>>> 7f9ad44 (done with payment and voucher)
=======

>>>>>>> 98415b4 (done with dashboard)
                _dbContext.Vouchers.AttachRange(expiredVouchers);
                await _dbContext.SaveChangesAsync();
                return "All Expired vouchers deactivated";
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

<<<<<<< HEAD
<<<<<<< HEAD
        public async Task<VoucherDto> getAsync(int id)
=======
        public async Task<VoucherDTO> getAsync(int id)
>>>>>>> 7f9ad44 (done with payment and voucher)
=======
        public async Task<VoucherDto> getAsync(int id)
>>>>>>> 836ec36 (changed all DTO to Dto)
        {
            try
            {
                var voucher = await _dbContext.Vouchers.FirstOrDefaultAsync(v => v.Id == id);
                if (voucher == null) return null!;
<<<<<<< HEAD
<<<<<<< HEAD
                var VoucherDto = _mapper.Map<VoucherDto>(voucher);

                return VoucherDto;
=======
                var voucherDTO = _mapper.Map<VoucherDTO>(voucher);

                return voucherDTO;
>>>>>>> 7f9ad44 (done with payment and voucher)
=======
                var VoucherDto = _mapper.Map<VoucherDto>(voucher);

                return VoucherDto;
>>>>>>> 836ec36 (changed all DTO to Dto)
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

<<<<<<< HEAD
<<<<<<< HEAD
        public async Task<IEnumerable<VoucherDto>> getCurrentRunningVouchers()
=======
        public async Task<IEnumerable<VoucherDTO>> getCurrentRunningVouchers()
>>>>>>> 7f9ad44 (done with payment and voucher)
=======
        public async Task<IEnumerable<VoucherDto>> getCurrentRunningVouchers()
>>>>>>> 836ec36 (changed all DTO to Dto)
        {
            try
            {
                var vouchers = await _dbContext.Vouchers
                    .OrderByDescending(v => v.CreatedAt)
                    .Where(v => v.IsExpired == false && v.IsActive == true)
                    .ToListAsync();
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 836ec36 (changed all DTO to Dto)
                var VoucherDtoList = _mapper.Map<List<VoucherDto>>(vouchers);
                return VoucherDtoList;
            }
            catch (Exception ex)
=======
                var voucherDTOList = _mapper.Map<List<VoucherDTO>>(vouchers);
                return voucherDTOList;
<<<<<<< HEAD
            }catch(Exception ex)
>>>>>>> 7f9ad44 (done with payment and voucher)
=======
            }
            catch (Exception ex)
>>>>>>> 98415b4 (done with dashboard)
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
<<<<<<< HEAD
                
                return num;
            }
            catch (Exception ex)
=======
                return num;
<<<<<<< HEAD
            }catch(Exception ex)
>>>>>>> 7f9ad44 (done with payment and voucher)
=======
            }
            catch (Exception ex)
>>>>>>> 98415b4 (done with dashboard)
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
<<<<<<< HEAD
<<<<<<< HEAD
                if (voucher.IsActive == true) return true;
=======
                if(voucher.IsActive == true) return true;
>>>>>>> 7f9ad44 (done with payment and voucher)
=======
                if (voucher.IsActive == true) return true;
>>>>>>> 98415b4 (done with dashboard)
                return false;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

<<<<<<< HEAD
<<<<<<< HEAD
        public async Task<VoucherDto> searchWithCode(string voucherCode)
=======
        public async Task<VoucherDTO> searchWithCode(string voucherCode)
>>>>>>> 7f9ad44 (done with payment and voucher)
=======
        public async Task<VoucherDto> searchWithCode(string voucherCode)
>>>>>>> 836ec36 (changed all DTO to Dto)
        {
            try
            {
                var voucher = await _dbContext.Vouchers
                    .FirstOrDefaultAsync(v => v.Code!.ToLower() == voucherCode.ToLower());
                if (voucher == null) return null!;
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 836ec36 (changed all DTO to Dto)
                var VoucherDto = _mapper.Map<VoucherDto>(voucher);
                return VoucherDto;
            }
            catch (Exception ex)
=======
                var voucherDTO = _mapper.Map<VoucherDTO>(voucher);
                return voucherDTO;
<<<<<<< HEAD
            }catch(Exception ex)
>>>>>>> 7f9ad44 (done with payment and voucher)
=======
            }
            catch (Exception ex)
>>>>>>> 98415b4 (done with dashboard)
            {
                throw new Exception(ex.Message);
            }
        }

<<<<<<< HEAD
<<<<<<< HEAD
        public async Task<IEnumerable<VoucherDto>> searchWithName(string name)
=======
        public async Task<IEnumerable<VoucherDTO>> searchWithName(string name)
>>>>>>> 7f9ad44 (done with payment and voucher)
=======
        public async Task<IEnumerable<VoucherDto>> searchWithName(string name)
>>>>>>> 836ec36 (changed all DTO to Dto)
        {
            try
            {
                var voucher = await _dbContext.Vouchers
                    .Where(v => v.Name!.ToLower().Contains(name.ToLower()))
                    .ToListAsync();
<<<<<<< HEAD
<<<<<<< HEAD
                var VoucherDto = _mapper.Map<List<VoucherDto>>(voucher);
                return VoucherDto;
=======
                var voucherDTO = _mapper.Map<List<VoucherDTO>>(voucher);
                return voucherDTO;
>>>>>>> 7f9ad44 (done with payment and voucher)
=======
                var VoucherDto = _mapper.Map<List<VoucherDto>>(voucher);
                return VoucherDto;
>>>>>>> 836ec36 (changed all DTO to Dto)
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

<<<<<<< HEAD
<<<<<<< HEAD
        public async Task<IEnumerable<VoucherDto>> searchWithType(string voucherType)
=======
        public async Task<IEnumerable<VoucherDTO>> searchWithType(string voucherType)
>>>>>>> 7f9ad44 (done with payment and voucher)
=======
        public async Task<IEnumerable<VoucherDto>> searchWithType(string voucherType)
>>>>>>> 836ec36 (changed all DTO to Dto)
        {
            try
            {
                var voucher = await _dbContext.Vouchers
                    .Where(v => v.Name!.ToLower().Contains(voucherType.ToLower()))
                    .ToListAsync();
<<<<<<< HEAD
<<<<<<< HEAD
                var VoucherDto = _mapper.Map<List<VoucherDto>>(voucher);
                return VoucherDto;
=======
                var voucherDTO = _mapper.Map<List<VoucherDTO>>(voucher);
                return voucherDTO;
>>>>>>> 7f9ad44 (done with payment and voucher)
=======
                var VoucherDto = _mapper.Map<List<VoucherDto>>(voucher);
                return VoucherDto;
>>>>>>> 836ec36 (changed all DTO to Dto)
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 98415b4 (done with dashboard)
        public async Task<int> totalNumberOfActiveVouchers()
        {
            try
            {
                var vouchers = await _dbContext.Vouchers
                    .Where(v => v.IsActive == true)
                    .CountAsync();
                return vouchers;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<int> totalNumberOfNonActiveVouchers()
        {
            try
            {
                var vouchers = await _dbContext.Vouchers
                    .Where(v => v.IsActive == false)
                    .CountAsync();
                return vouchers;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<int> totalNumberOfVouchers()
        {
            try
            {
                var vouchers = await _dbContext.Vouchers.CountAsync();
                return vouchers;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

<<<<<<< HEAD
<<<<<<< HEAD
        public async Task<VoucherDto> updateAsync(VoucherDto voucher, int id)
=======
=======
>>>>>>> 98415b4 (done with dashboard)
        public async Task<VoucherDTO> updateAsync(VoucherDTO voucher, int id)
>>>>>>> 7f9ad44 (done with payment and voucher)
=======
        public async Task<VoucherDto> updateAsync(VoucherDto voucher, int id)
>>>>>>> 836ec36 (changed all DTO to Dto)
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
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 836ec36 (changed all DTO to Dto)
                var VoucherDto = _mapper.Map<VoucherDto>(initialVoucher);
                return VoucherDto;
            }
            catch (Exception ex)
=======
                var voucherDTO = _mapper.Map<VoucherDTO>(initialVoucher);
                return voucherDTO;
<<<<<<< HEAD
            }catch(Exception ex)
>>>>>>> 7f9ad44 (done with payment and voucher)
=======
            }
            catch (Exception ex)
>>>>>>> 98415b4 (done with dashboard)
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
<<<<<<< HEAD
                voucher.IsExpired = true;
                voucher.Status = "Used";
                voucher.IsActive = false;
=======
>>>>>>> 7f9ad44 (done with payment and voucher)
                voucher.UpdatedAt = DateTime.UtcNow;
                _dbContext.Vouchers.Attach(voucher);
                await _dbContext.SaveChangesAsync();
                return "Successful";

<<<<<<< HEAD
<<<<<<< HEAD
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<object> useVoucherByCustomer(string voucherCode, int customerId)
        {
            try
            {
                var voucher = await _dbContext.Vouchers
                    .FirstOrDefaultAsync(v => v.Code!.ToLower() == voucherCode.ToLower());
                if (voucher is null) return null!;
                if ((bool)voucher.IsExpired!) throw new Exception("Voucher expired");
                if ((bool)!voucher.IsActive!) throw new Exception("Voucher not active");
                if (voucher.TotalNumberAvailable <= voucher.TotalNumberUsed) throw new Exception("Voucher exhausted");
                if (voucher.EndDate < DateTime.UtcNow) 
                {
                    voucher.IsExpired = true;
                    voucher.Status = "Used";
                    voucher.IsActive = false;
                    throw new Exception("Voucher expired");
                }

                voucher.TotalNumberUsed += 1;
                // voucher.IsExpired = true;
                voucher.Status = "On Use";
                // voucher.IsActive = false;
                voucher.UpdatedAt = DateTime.UtcNow;

                var customerVoucherDto = new CustomerVoucherDto
                {
                    CustomerId = customerId,
                    VoucherId = voucher.Id
                };
                await _customerVoucher.CreateAsync(customerVoucherDto);
                _dbContext.Vouchers.Attach(voucher);
                await _dbContext.SaveChangesAsync();
                return voucher;

=======
>>>>>>> 98415b4 (done with dashboard)
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<object> voucherStats()
        {
            try
            {
                var stats = new
                {
                    totalNumberOfActiveVouchers = await totalNumberOfActiveVouchers(),
                    totalNumberOfNonActiveVouchers = await totalNumberOfNonActiveVouchers(),
                    totalNumberOfVouchers = await totalNumberOfVouchers()
                };
                return stats;
            }
            catch (Exception ex)
<<<<<<< HEAD
=======
            }catch(Exception ex)
>>>>>>> 7f9ad44 (done with payment and voucher)
=======
>>>>>>> 98415b4 (done with dashboard)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
