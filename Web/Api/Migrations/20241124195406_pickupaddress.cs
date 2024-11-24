using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Api.Migrations
{
    /// <inheritdoc />
    public partial class pickupaddress : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Deliveries_Addresses_AddressId",
                table: "Deliveries");

            migrationBuilder.RenameColumn(
                name: "AddressId",
                table: "Deliveries",
                newName: "PickUpAddressId");

            migrationBuilder.RenameIndex(
                name: "IX_Deliveries_AddressId",
                table: "Deliveries",
                newName: "IX_Deliveries_PickUpAddressId");

            migrationBuilder.AddColumn<int>(
                name: "DelAddressId",
                table: "Deliveries",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "DeliveryAddressId",
                table: "Deliveries",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Deliveries_DelAddressId",
                table: "Deliveries",
                column: "DelAddressId");

            migrationBuilder.AddForeignKey(
                name: "FK_Deliveries_Addresses_DelAddressId",
                table: "Deliveries",
                column: "DelAddressId",
                principalTable: "Addresses",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Deliveries_Addresses_PickUpAddressId",
                table: "Deliveries",
                column: "PickUpAddressId",
                principalTable: "Addresses",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Deliveries_Addresses_DelAddressId",
                table: "Deliveries");

            migrationBuilder.DropForeignKey(
                name: "FK_Deliveries_Addresses_PickUpAddressId",
                table: "Deliveries");

            migrationBuilder.DropIndex(
                name: "IX_Deliveries_DelAddressId",
                table: "Deliveries");

            migrationBuilder.DropColumn(
                name: "DelAddressId",
                table: "Deliveries");

            migrationBuilder.DropColumn(
                name: "DeliveryAddressId",
                table: "Deliveries");

            migrationBuilder.RenameColumn(
                name: "PickUpAddressId",
                table: "Deliveries",
                newName: "AddressId");

            migrationBuilder.RenameIndex(
                name: "IX_Deliveries_PickUpAddressId",
                table: "Deliveries",
                newName: "IX_Deliveries_AddressId");

            migrationBuilder.AddForeignKey(
                name: "FK_Deliveries_Addresses_AddressId",
                table: "Deliveries",
                column: "AddressId",
                principalTable: "Addresses",
                principalColumn: "Id");
        }
    }
}
