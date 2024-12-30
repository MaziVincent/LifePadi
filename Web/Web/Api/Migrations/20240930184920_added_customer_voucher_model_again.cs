using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Api.Migrations
{
    /// <inheritdoc />
    public partial class added_customer_voucher_model_again : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CustomerVoucher_Transactions_TransactionId",
                table: "CustomerVoucher");

            migrationBuilder.DropForeignKey(
                name: "FK_CustomerVoucher_Users_CustomerId",
                table: "CustomerVoucher");

            migrationBuilder.DropForeignKey(
                name: "FK_CustomerVoucher_Vouchers_VoucherId",
                table: "CustomerVoucher");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CustomerVoucher",
                table: "CustomerVoucher");

            migrationBuilder.RenameTable(
                name: "CustomerVoucher",
                newName: "CustomerVouchers");

            migrationBuilder.RenameIndex(
                name: "IX_CustomerVoucher_VoucherId",
                table: "CustomerVouchers",
                newName: "IX_CustomerVouchers_VoucherId");

            migrationBuilder.RenameIndex(
                name: "IX_CustomerVoucher_TransactionId",
                table: "CustomerVouchers",
                newName: "IX_CustomerVouchers_TransactionId");

            migrationBuilder.RenameIndex(
                name: "IX_CustomerVoucher_CustomerId",
                table: "CustomerVouchers",
                newName: "IX_CustomerVouchers_CustomerId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CustomerVouchers",
                table: "CustomerVouchers",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_CustomerVouchers_Transactions_TransactionId",
                table: "CustomerVouchers",
                column: "TransactionId",
                principalTable: "Transactions",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_CustomerVouchers_Users_CustomerId",
                table: "CustomerVouchers",
                column: "CustomerId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_CustomerVouchers_Vouchers_VoucherId",
                table: "CustomerVouchers",
                column: "VoucherId",
                principalTable: "Vouchers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CustomerVouchers_Transactions_TransactionId",
                table: "CustomerVouchers");

            migrationBuilder.DropForeignKey(
                name: "FK_CustomerVouchers_Users_CustomerId",
                table: "CustomerVouchers");

            migrationBuilder.DropForeignKey(
                name: "FK_CustomerVouchers_Vouchers_VoucherId",
                table: "CustomerVouchers");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CustomerVouchers",
                table: "CustomerVouchers");

            migrationBuilder.RenameTable(
                name: "CustomerVouchers",
                newName: "CustomerVoucher");

            migrationBuilder.RenameIndex(
                name: "IX_CustomerVouchers_VoucherId",
                table: "CustomerVoucher",
                newName: "IX_CustomerVoucher_VoucherId");

            migrationBuilder.RenameIndex(
                name: "IX_CustomerVouchers_TransactionId",
                table: "CustomerVoucher",
                newName: "IX_CustomerVoucher_TransactionId");

            migrationBuilder.RenameIndex(
                name: "IX_CustomerVouchers_CustomerId",
                table: "CustomerVoucher",
                newName: "IX_CustomerVoucher_CustomerId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CustomerVoucher",
                table: "CustomerVoucher",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_CustomerVoucher_Transactions_TransactionId",
                table: "CustomerVoucher",
                column: "TransactionId",
                principalTable: "Transactions",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_CustomerVoucher_Users_CustomerId",
                table: "CustomerVoucher",
                column: "CustomerId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_CustomerVoucher_Vouchers_VoucherId",
                table: "CustomerVoucher",
                column: "VoucherId",
                principalTable: "Vouchers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
