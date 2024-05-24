using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Api.Migrations
{
    /// <inheritdoc />
    public partial class added_listOfDeliveries_to_rider : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Orders_Users_RiderId",
                table: "Orders");

            migrationBuilder.DropIndex(
                name: "IX_Orders_RiderId",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "RiderId",
                table: "Orders");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "RiderId",
                table: "Orders",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Orders_RiderId",
                table: "Orders",
                column: "RiderId");

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_Users_RiderId",
                table: "Orders",
                column: "RiderId",
                principalTable: "Users",
                principalColumn: "Id");
        }
    }
}
