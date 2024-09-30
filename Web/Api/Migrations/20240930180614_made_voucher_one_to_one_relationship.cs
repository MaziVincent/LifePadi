using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Api.Migrations
{
    /// <inheritdoc />
    public partial class made_voucher_one_to_one_relationship : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Transactions_VoucherId",
                table: "Transactions");

            migrationBuilder.DropColumn(
                name: "TotalNumberAvailable",
                table: "Vouchers");

            migrationBuilder.RenameColumn(
                name: "TotalNumberUsed",
                table: "Vouchers",
                newName: "TransactionId");

            migrationBuilder.CreateIndex(
                name: "IX_Transactions_VoucherId",
                table: "Transactions",
                column: "VoucherId",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Transactions_VoucherId",
                table: "Transactions");

            migrationBuilder.RenameColumn(
                name: "TransactionId",
                table: "Vouchers",
                newName: "TotalNumberUsed");

            migrationBuilder.AddColumn<int>(
                name: "TotalNumberAvailable",
                table: "Vouchers",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Transactions_VoucherId",
                table: "Transactions",
                column: "VoucherId");
        }
    }
}
