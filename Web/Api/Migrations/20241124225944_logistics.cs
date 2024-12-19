using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Api.Migrations
{
    /// <inheritdoc />
    public partial class logistics : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<double>(
                name: "ItemWeight",
                table: "Logistics",
                type: "double precision",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsFragile",
                table: "Logistics",
                type: "boolean",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "RecieverAddressId",
                table: "Logistics",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "RecieverAddressModelId",
                table: "Logistics",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "SenderAddressId",
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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
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
                name: "IsFragile",
                table: "Logistics");

            migrationBuilder.DropColumn(
                name: "RecieverAddressId",
                table: "Logistics");

            migrationBuilder.DropColumn(
                name: "RecieverAddressModelId",
                table: "Logistics");

            migrationBuilder.DropColumn(
                name: "SenderAddressId",
                table: "Logistics");

            migrationBuilder.DropColumn(
                name: "SenderAddressModelId",
                table: "Logistics");

            migrationBuilder.AlterColumn<string>(
                name: "ItemWeight",
                table: "Logistics",
                type: "text",
                nullable: true,
                oldClrType: typeof(double),
                oldType: "double precision",
                oldNullable: true);
        }
    }
}
