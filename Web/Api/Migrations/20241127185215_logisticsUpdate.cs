using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Api.Migrations
{
    /// <inheritdoc />
    public partial class logisticsUpdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Logistics_Addresses_RecieverAddressModelId",
                table: "Logistics");

            migrationBuilder.DropForeignKey(
                name: "FK_Logistics_Addresses_SenderAddressModelId",
                table: "Logistics");

            migrationBuilder.DropIndex(
                name: "IX_Logistics_RecieverAddressModelId",
                table: "Logistics");

            migrationBuilder.DropIndex(
                name: "IX_Logistics_SenderAddressModelId",
                table: "Logistics");

            migrationBuilder.DropColumn(
                name: "RecieverAddressModelId",
                table: "Logistics");

            migrationBuilder.DropColumn(
                name: "SenderAddressModelId",
                table: "Logistics");

            migrationBuilder.RenameColumn(
                name: "SenderAddress",
                table: "Logistics",
                newName: "SenderAddressOld");

            migrationBuilder.RenameColumn(
                name: "ReceiverAddress",
                table: "Logistics",
                newName: "ReceiverAddressOld");

            migrationBuilder.CreateIndex(
                name: "IX_Logistics_RecieverAddressId",
                table: "Logistics",
                column: "RecieverAddressId");

            migrationBuilder.CreateIndex(
                name: "IX_Logistics_SenderAddressId",
                table: "Logistics",
                column: "SenderAddressId");

            migrationBuilder.AddForeignKey(
                name: "FK_Logistics_Addresses_RecieverAddressId",
                table: "Logistics",
                column: "RecieverAddressId",
                principalTable: "Addresses",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Logistics_Addresses_SenderAddressId",
                table: "Logistics",
                column: "SenderAddressId",
                principalTable: "Addresses",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Logistics_Addresses_RecieverAddressId",
                table: "Logistics");

            migrationBuilder.DropForeignKey(
                name: "FK_Logistics_Addresses_SenderAddressId",
                table: "Logistics");

            migrationBuilder.DropIndex(
                name: "IX_Logistics_RecieverAddressId",
                table: "Logistics");

            migrationBuilder.DropIndex(
                name: "IX_Logistics_SenderAddressId",
                table: "Logistics");

            migrationBuilder.RenameColumn(
                name: "SenderAddressOld",
                table: "Logistics",
                newName: "SenderAddress");

            migrationBuilder.RenameColumn(
                name: "ReceiverAddressOld",
                table: "Logistics",
                newName: "ReceiverAddress");

            migrationBuilder.AddColumn<int>(
                name: "RecieverAddressModelId",
                table: "Logistics",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "SenderAddressModelId",
                table: "Logistics",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Logistics_RecieverAddressModelId",
                table: "Logistics",
                column: "RecieverAddressModelId");

            migrationBuilder.CreateIndex(
                name: "IX_Logistics_SenderAddressModelId",
                table: "Logistics",
                column: "SenderAddressModelId");

            migrationBuilder.AddForeignKey(
                name: "FK_Logistics_Addresses_RecieverAddressModelId",
                table: "Logistics",
                column: "RecieverAddressModelId",
                principalTable: "Addresses",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Logistics_Addresses_SenderAddressModelId",
                table: "Logistics",
                column: "SenderAddressModelId",
                principalTable: "Addresses",
                principalColumn: "Id");
        }
    }
}
