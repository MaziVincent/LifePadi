namespace Api.DTO
{
    public class SearchPaging
    {
        public string? SearchString { get; set; }
        public int PageNumber { get; set; } = 1;
        public int _pageSize { get; set; } = 5;
        public int PageSize
        {
            get
            {
                return _pageSize;
            }
            set
            {
                _pageSize = value > MaxPageSize ? MaxPageSize : value;
            }
        }
        const int MaxPageSize = 20;
    }
}
