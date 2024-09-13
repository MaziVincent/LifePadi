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
    public class FavouriteService : IFavourite
    {
        private readonly DBContext _context;
        private readonly IMapper _mapper;
        public FavouriteService(DBContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<List<FavouriteDto>> allAsync()
        {
            try
            {
                var favourites = await _context.Favourites
                .Include(f => f.Customer)
                .Include(f => f.Product)
                .OrderByDescending(f => f.CreatedAt)
                .ToListAsync();
                return _mapper.Map<List<FavouriteDto>>(favourites);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<FavouriteDto> createAsync(FavouriteDto favourite)
        {
            try
            {
                var newFavourite = _mapper.Map<Favourite>(favourite);
                await _context.Favourites.AddAsync(newFavourite);
                await _context.SaveChangesAsync();
                return _mapper.Map<FavouriteDto>(newFavourite);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<List<FavouriteDto>> customerFavourites(int customerId)
        {
            try
            {
                var favourites = await _context.Favourites
                .Include(f => f.Customer)
                .Include(f => f.Product)
                .Where(f => f.CustomerId == customerId)
                .OrderByDescending(f => f.CreatedAt)
                .ToListAsync();
                return _mapper.Map<List<FavouriteDto>>(favourites);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<string> deleteAsync(int id)
        {
            try
            {
                var favourite = await _context.Favourites.FindAsync(id);
                if (favourite == null) throw new Exceptions.ServiceException("Favourite not found");
                _context.Favourites.Remove(favourite);
                await _context.SaveChangesAsync();
                return "Favourite deleted successfully";
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<FavouriteDto> getAsync(int id)
        {
            try
            {
                var favourite = await _context.Favourites
                .Include(f => f.Customer)
                .Include(f => f.Product)
                .FirstOrDefaultAsync(f => f.Id == id);
                return _mapper.Map<FavouriteDto>(favourite);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<List<FavouriteDto>> productFavourites(int productId)
        {
            try
            {
                var favourites = await _context.Favourites
                .Include(f => f.Customer)
                .Include(f => f.Product)
                .Where(f => f.ProductId == productId)
                .OrderByDescending(f => f.CreatedAt)
                .ToListAsync();
                return _mapper.Map<List<FavouriteDto>>(favourites);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<FavouriteDto> updateAsync(int id, FavouriteDto favourite)
        {
            try
            {
                var existingFavourite = await _context.Favourites.FirstOrDefaultAsync(f => f.Id == id);
                if (existingFavourite == null) throw new Exceptions.ServiceException("Favourite not found");
                _mapper.Map(favourite, existingFavourite);
                await _context.SaveChangesAsync();
                return _mapper.Map<FavouriteDto>(existingFavourite);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
