using Api.DTO;

namespace Api.Interfaces
{
    public interface IService
    {
        public Task<IEnumerable<ServiceDTO>> allAsync();
        public Task<IEnumerable<ServiceDTOLite>> servicesLite();
        public Task<ServiceDTO> getAsync(int id);
        public Task<ServiceDTO> updateAsync(ServiceDTO service, int id);
        public Task<string> deleteAsync(int id);
        public Task<ServiceDTO> createAsync(ServiceDTO service);
        public Task<IEnumerable<ServiceDTO>> searchByName(string name);
        public Task<bool> nameExists(string name);
        public Task<bool> isActive(int id);
        public Task<IEnumerable<ServiceDTO>> nonActiveService();
        public Task<ServiceDTO> uploadImgUrl(int id, string imgUrl);
    }
}
