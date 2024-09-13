using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.DTO;

namespace Api.Interfaces
{
    public interface IFavourite
    {
        public Task<List<FavouriteDto>> allAsync();
        public Task<FavouriteDto> getAsync(int id);
        public Task<FavouriteDto> createAsync(FavouriteDto favourite);
        public Task<FavouriteDto> updateAsync(int id, FavouriteDto favourite);
        public Task<string> deleteAsync(int id);
        public Task<List<FavouriteDto>> customerFavourites(int customerId);
        public Task<List<FavouriteDto>> productFavourites(int productId);
    }
}