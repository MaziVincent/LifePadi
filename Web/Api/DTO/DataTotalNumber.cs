namespace Api.DTO
{
    public class DataTotalNumber
    {
        public int? TotalNumber { get; set; }
        public object[]? Data { get; set; }
    }

    public class PageList
    {
        public int? PageNumber { get; set; }
        public int? PageSize { get; set; }
        public int? Next { get; set; }
        public int? Previous { get; set; }
        public int? TotalNumber { get; set; }
        public object[]? Data { get; set; }
    }
}
