namespace Api.DTO
{
    public class TokenDTO
    {
        public string? AccessToken { get; set; }
        public string? RefreshToken { get; set; }
    }

    public class GenTokenDTO
    {
        public int Id { get; set; }
        public string? Email { get; set; }
        public string? Type { get; set; }
    }
}
