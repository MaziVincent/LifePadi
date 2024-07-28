namespace Api.DTO
{
    public class TokenDto
    {
        public string? AccessToken { get; set; }
        public string? RefreshToken { get; set; }
    }

    public class GenTokenDto
    {
        public int Id { get; set; }
        public string? Email { get; set; }
        // public string? Type { get; set; }
    }
}
