using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Api.Migrations
{
    /// <inheritdoc />
    public partial class logisticsreceiver : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Logistics_Addresses_RecieverAddressId",
                table: "Logistics");

            migrationBuilder.DropIndex(
                name: "IX_Logistics_OrderId",
                table: "Logistics");

            migrationBuilder.RenameColumn(
                name: "RecieverAddressId",
                table: "Logistics",
                newName: "ReceiverAddressId");

            migrationBuilder.RenameIndex(
                name: "IX_Logistics_RecieverAddressId",
                table: "Logistics",
                newName: "IX_Logistics_ReceiverAddressId");

            migrationBuilder.CreateIndex(
                name: "IX_Logistics_OrderId",
                table: "Logistics",
                column: "OrderId");

            migrationBuilder.AddForeignKey(
                name: "FK_Logistics_Addresses_ReceiverAddressId",
                table: "Logistics",
                column: "ReceiverAddressId",
                principalTable: "Addresses",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Logistics_Addresses_ReceiverAddressId",
                table: "Logistics");

            migrationBuilder.DropIndex(
                name: "IX_Logistics_OrderId",
                table: "Logistics");

            migrationBuilder.RenameColumn(
                name: "ReceiverAddressId",
                table: "Logistics",
                newName: "RecieverAddressId");

            migrationBuilder.RenameIndex(
                name: "IX_Logistics_ReceiverAddressId",
                table: "Logistics",
                newName: "IX_Logistics_RecieverAddressId");

            migrationBuilder.CreateIndex(
                name: "IX_Logistics_OrderId",
                table: "Logistics",
                column: "OrderId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Logistics_Addresses_RecieverAddressId",
                table: "Logistics",
                column: "RecieverAddressId",
                principalTable: "Addresses",
                principalColumn: "Id");
        }
    }
}
