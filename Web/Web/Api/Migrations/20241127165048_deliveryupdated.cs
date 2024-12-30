using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Api.Migrations
{
    /// <inheritdoc />
    public partial class deliveryupdated : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Deliveries_Addresses_DelAddressId",
                table: "Deliveries");

            migrationBuilder.DropIndex(
                name: "IX_Deliveries_DelAddressId",
                table: "Deliveries");

            migrationBuilder.DropColumn(
                name: "DelAddressId",
                table: "Deliveries");

            migrationBuilder.RenameColumn(
                name: "DeliveryAddress",
                table: "Deliveries",
                newName: "DelAddress");

            migrationBuilder.AlterColumn<double>(
                name: "SubTotal",
                table: "Transactions",
                type: "double precision",
                nullable: true,
                oldClrType: typeof(double),
                oldType: "double precision");

            migrationBuilder.CreateIndex(
                name: "IX_Deliveries_DeliveryAddressId",
                table: "Deliveries",
                column: "DeliveryAddressId");

            migrationBuilder.AddForeignKey(
                name: "FK_Deliveries_Addresses_DeliveryAddressId",
                table: "Deliveries",
                column: "DeliveryAddressId",
                principalTable: "Addresses",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Deliveries_Addresses_DeliveryAddressId",
                table: "Deliveries");

            migrationBuilder.DropIndex(
                name: "IX_Deliveries_DeliveryAddressId",
                table: "Deliveries");

            migrationBuilder.RenameColumn(
                name: "DelAddress",
                table: "Deliveries",
                newName: "DeliveryAddress");

            migrationBuilder.AlterColumn<double>(
                name: "SubTotal",
                table: "Transactions",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0,
                oldClrType: typeof(double),
                oldType: "double precision",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "DelAddressId",
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
        }
    }
}
