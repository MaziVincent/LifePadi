using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Api.Migrations
{
    /// <inheritdoc />
    public partial class AddReferralCodeToExistingCustomers : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // First, add the ReferralCode column if it doesn't exist
            migrationBuilder.AddColumn<string>(
                name: "ReferralCode",
                table: "Users",
                type: "text",
                nullable: true);

            // Create unique index on ReferralCode
            migrationBuilder.CreateIndex(
                name: "IX_Users_ReferralCode",
                table: "Users",
                column: "ReferralCode",
                unique: true,
                filter: "[ReferralCode] IS NOT NULL");

            // Update existing customers with unique referral codes
            migrationBuilder.Sql(@"
                UPDATE ""Users"" 
                SET ""ReferralCode"" = UPPER(
                    SUBSTR(
                        REPLACE(
                            REPLACE(
                                REPLACE(encode(gen_random_bytes(8), 'base64'), '+', ''), 
                                '/', ''
                            ), 
                            '=', ''
                        ), 
                        1, 6
                    )
                )
                WHERE ""ReferralCode"" IS NULL 
                AND ""Discriminator"" = 'Customer';
            ");

            // Ensure all referral codes are unique by updating duplicates
            migrationBuilder.Sql(@"
                WITH numbered_rows AS (
                    SELECT ""Id"", 
                           ""ReferralCode"",
                           ROW_NUMBER() OVER (PARTITION BY ""ReferralCode"" ORDER BY ""Id"") as rn
                    FROM ""Users""
                    WHERE ""Discriminator"" = 'Customer'
                    AND ""ReferralCode"" IS NOT NULL
                )
                UPDATE ""Users""
                SET ""ReferralCode"" = UPPER(
                    SUBSTR(
                        REPLACE(
                            REPLACE(
                                REPLACE(encode(gen_random_bytes(8), 'base64'), '+', ''), 
                                '/', ''
                            ), 
                            '=', ''
                        ), 
                        1, 6
                    )
                )
                FROM numbered_rows
                WHERE ""Users"".""Id"" = numbered_rows.""Id""
                AND numbered_rows.rn > 1;
            ");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Users_ReferralCode",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "ReferralCode",
                table: "Users");
        }
    }
}
