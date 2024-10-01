using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Api.Migrations
{
    /// <inheritdoc />
    public partial class add_a_property_to_voucher_model : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "TotalNumberAvailable",
                table: "Vouchers",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "TotalNumberUsed",
                table: "Vouchers",
                type: "integer",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TotalNumberAvailable",
                table: "Vouchers");

            migrationBuilder.DropColumn(
                name: "TotalNumberUsed",
                table: "Vouchers");
        }
    }
}
