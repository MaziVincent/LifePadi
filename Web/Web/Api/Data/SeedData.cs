using Api.Helpers;
using Api.Models;
using Bogus;

namespace Api.Data
{
    public class SeedData
    {
        private static readonly Faker faker = new Faker();
        public static void seed(DBContext dbContext)
        {
            dbContext.Admins.AddRange(
                new Admin { 
                    FirstName = "Ikenna", 
                    LastName = "Eze", 
                    Email = "ikenna@gmail.com",
                    PhoneNumber = "+2347062682820",
                    ContactAddress = "No 34 Alugbalueze street Abakaliki",
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow,
                    SearchString = "IKENNA EZE IKENNA@GMAIL.COM",
                    PasswordHash = PasswordHasher.hashPassword("ikenna123")
                }
            );
            dbContext.Customers.AddRange(
                new Customer
                {
                    FirstName = "Joy",
                    LastName = "Okafor",
                    Email = "joy@gmail.com",
                    DOB = new DateTime(1992, 4, 8),
                    PhoneNumber = "+2348062682850",
                    ContactAddress = "Teachrs quaters Udensi Abakaliki",
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow,
                    PasswordHash = PasswordHasher.hashPassword("ikenna123")
                }
            );

            for ( int i = 0; i <= 15; i++ )
            {
                dbContext.Customers.Add(
                    new Customer
                    {
                        FirstName = faker.Name.FirstName(),
                        LastName = faker.Name.LastName(),
                        Email = faker.Person.Email,
                        DOB = faker.Date.Between(
                            new DateTime(20, 1, 1), // January 1st, year 20
                            new DateTime(30, 1, 1)  // January 1st, year 30
                        ),
                        PhoneNumber = faker.Phone.PhoneNumber(),
                        ContactAddress = faker.Address.FullAddress(),
                        PasswordHash = PasswordHasher.hashPassword(faker.Phone.PhoneNumber()),
                        CreatedAt = DateTime.UtcNow,
                        UpdatedAt = DateTime.UtcNow,
                    }
                );
            }
        }
    }
}
