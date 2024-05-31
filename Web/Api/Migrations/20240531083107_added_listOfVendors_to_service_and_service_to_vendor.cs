using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Api.Migrations
{
    /// <inheritdoc />
    public partial class added_listOfVendors_to_service_and_service_to_vendor : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ServiceId",
                table: "Users",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Users_ServiceId",
                table: "Users",
                column: "ServiceId");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Services_ServiceId",
                table: "Users",
                column: "ServiceId",
                principalTable: "Services",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_Services_ServiceId",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Users_ServiceId",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "ServiceId",
                table: "Users");
        }
    }
}
