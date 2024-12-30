namespace Api.Helpers
{
    public class PasswordHasher
    {
        public static string hashPassword(string password)
        {
           return BCrypt.Net.BCrypt.HashPassword(password);
        }
    }
}
