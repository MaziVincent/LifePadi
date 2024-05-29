using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Api.Migrations
{
    /// <inheritdoc />
    public partial class added_voucher_model : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Status",
                table: "Transactions",
                type: "text",
                nullable: true,
                oldClrType: typeof(bool),
                oldType: "boolean",
                oldNullable: true);

            migrationBuilder.AddColumn<double>(
                name: "AmountPaid",
                table: "Transactions",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<int>(
                name: "VoucherId",
                table: "Transactions",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Vouchers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: true),
                    Description = table.Column<string>(type: "text", nullable: true),
                    Code = table.Column<string>(type: "text", nullable: true),
                    Type = table.Column<string>(type: "text", nullable: true),
                    IsActive = table.Column<bool>(type: "boolean", nullable: true),
                    IsExpired = table.Column<bool>(type: "boolean", nullable: true),
                    TotalNumberAvailable = table.Column<int>(type: "integer", nullable: true),
                    TotalNumberUsed = table.Column<int>(type: "integer", nullable: true),
                    StartDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    EndDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    DiscountPercentage = table.Column<int>(type: "integer", nullable: true),
                    Status = table.Column<string>(type: "text", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Vouchers", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Transactions_VoucherId",
                table: "Transactions",
                column: "VoucherId");

            migrationBuilder.AddForeignKey(
                name: "FK_Transactions_Vouchers_VoucherId",
                table: "Transactions",
                column: "VoucherId",
                principalTable: "Vouchers",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Transactions_Vouchers_VoucherId",
                table: "Transactions");

            migrationBuilder.DropTable(
                name: "Vouchers");

            migrationBuilder.DropIndex(
                name: "IX_Transactions_VoucherId",
                table: "Transactions");

            migrationBuilder.DropColumn(
                name: "AmountPaid",
                table: "Transactions");

            migrationBuilder.DropColumn(
                name: "VoucherId",
                table: "Transactions");

            migrationBuilder.AlterColumn<bool>(
                name: "Status",
                table: "Transactions",
                type: "boolean",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);
        }
    }
}
