using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Interfaces
{
    public interface IReview<T>
    {
        public Task<List<T>> allAsync();
        public Task<T> findAsync(int id);
        public Task<T> createAsync(T reviewDto);
        public Task<T> updateAsync(int id, T reviewDto);
        public Task<string> deleteAsync(int id);
        public Task<List<T>> allByObjectAsync(int objectId);
        public Task<double> averageRating(int objectId);
        public Task<object> reviewStats(int objectId);
    }
}