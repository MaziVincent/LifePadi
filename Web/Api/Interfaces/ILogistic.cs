using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.DTO;
using Api.Services;
using Api.Models;

namespace Api.Interfaces
{
    public interface ILogistic
    {
        public Task<LogisticDto> createAsync(LogisticDto logisticDto);
        public Task<IEnumerable<LogisticDto>> getAll();
        public Task<LogisticDto> getAsync(int id);
        public Task<PagedList<Logistic>> allAsync(SearchPaging props);
        public Task<string> deleteAsync(int id);
    }
}