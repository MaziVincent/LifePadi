using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Api.Migrations
{
    /// <inheritdoc />
    public partial class modify_productReview_vendorReview_riderReview : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProductReview_Products_ProductId",
                table: "ProductReview");

            migrationBuilder.DropForeignKey(
                name: "FK_ProductReview_Users_CustomerId",
                table: "ProductReview");

            migrationBuilder.DropForeignKey(
                name: "FK_RiderReview_Users_CustomerId",
                table: "RiderReview");

            migrationBuilder.DropForeignKey(
                name: "FK_RiderReview_Users_RiderId",
                table: "RiderReview");

            migrationBuilder.DropForeignKey(
                name: "FK_VendorReview_Users_CustomerId",
                table: "VendorReview");

            migrationBuilder.DropForeignKey(
                name: "FK_VendorReview_Users_VendorId",
                table: "VendorReview");

            migrationBuilder.DropPrimaryKey(
                name: "PK_VendorReview",
                table: "VendorReview");

            migrationBuilder.DropPrimaryKey(
                name: "PK_RiderReview",
                table: "RiderReview");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ProductReview",
                table: "ProductReview");

            migrationBuilder.RenameTable(
                name: "VendorReview",
                newName: "VendorReviews");

            migrationBuilder.RenameTable(
                name: "RiderReview",
                newName: "RiderReviews");

            migrationBuilder.RenameTable(
                name: "ProductReview",
                newName: "ProductReviews");

            migrationBuilder.RenameIndex(
                name: "IX_VendorReview_VendorId",
                table: "VendorReviews",
                newName: "IX_VendorReviews_VendorId");

            migrationBuilder.RenameIndex(
                name: "IX_VendorReview_CustomerId",
                table: "VendorReviews",
                newName: "IX_VendorReviews_CustomerId");

            migrationBuilder.RenameIndex(
                name: "IX_RiderReview_RiderId",
                table: "RiderReviews",
                newName: "IX_RiderReviews_RiderId");

            migrationBuilder.RenameIndex(
                name: "IX_RiderReview_CustomerId",
                table: "RiderReviews",
                newName: "IX_RiderReviews_CustomerId");

            migrationBuilder.RenameIndex(
                name: "IX_ProductReview_ProductId",
                table: "ProductReviews",
                newName: "IX_ProductReviews_ProductId");

            migrationBuilder.RenameIndex(
                name: "IX_ProductReview_CustomerId",
                table: "ProductReviews",
                newName: "IX_ProductReviews_CustomerId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_VendorReviews",
                table: "VendorReviews",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_RiderReviews",
                table: "RiderReviews",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ProductReviews",
                table: "ProductReviews",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ProductReviews_Products_ProductId",
                table: "ProductReviews",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ProductReviews_Users_CustomerId",
                table: "ProductReviews",
                column: "CustomerId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_RiderReviews_Users_CustomerId",
                table: "RiderReviews",
                column: "CustomerId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_RiderReviews_Users_RiderId",
                table: "RiderReviews",
                column: "RiderId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_VendorReviews_Users_CustomerId",
                table: "VendorReviews",
                column: "CustomerId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_VendorReviews_Users_VendorId",
                table: "VendorReviews",
                column: "VendorId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProductReviews_Products_ProductId",
                table: "ProductReviews");

            migrationBuilder.DropForeignKey(
                name: "FK_ProductReviews_Users_CustomerId",
                table: "ProductReviews");

            migrationBuilder.DropForeignKey(
                name: "FK_RiderReviews_Users_CustomerId",
                table: "RiderReviews");

            migrationBuilder.DropForeignKey(
                name: "FK_RiderReviews_Users_RiderId",
                table: "RiderReviews");

            migrationBuilder.DropForeignKey(
                name: "FK_VendorReviews_Users_CustomerId",
                table: "VendorReviews");

            migrationBuilder.DropForeignKey(
                name: "FK_VendorReviews_Users_VendorId",
                table: "VendorReviews");

            migrationBuilder.DropPrimaryKey(
                name: "PK_VendorReviews",
                table: "VendorReviews");

            migrationBuilder.DropPrimaryKey(
                name: "PK_RiderReviews",
                table: "RiderReviews");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ProductReviews",
                table: "ProductReviews");

            migrationBuilder.RenameTable(
                name: "VendorReviews",
                newName: "VendorReview");

            migrationBuilder.RenameTable(
                name: "RiderReviews",
                newName: "RiderReview");

            migrationBuilder.RenameTable(
                name: "ProductReviews",
                newName: "ProductReview");

            migrationBuilder.RenameIndex(
                name: "IX_VendorReviews_VendorId",
                table: "VendorReview",
                newName: "IX_VendorReview_VendorId");

            migrationBuilder.RenameIndex(
                name: "IX_VendorReviews_CustomerId",
                table: "VendorReview",
                newName: "IX_VendorReview_CustomerId");

            migrationBuilder.RenameIndex(
                name: "IX_RiderReviews_RiderId",
                table: "RiderReview",
                newName: "IX_RiderReview_RiderId");

            migrationBuilder.RenameIndex(
                name: "IX_RiderReviews_CustomerId",
                table: "RiderReview",
                newName: "IX_RiderReview_CustomerId");

            migrationBuilder.RenameIndex(
                name: "IX_ProductReviews_ProductId",
                table: "ProductReview",
                newName: "IX_ProductReview_ProductId");

            migrationBuilder.RenameIndex(
                name: "IX_ProductReviews_CustomerId",
                table: "ProductReview",
                newName: "IX_ProductReview_CustomerId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_VendorReview",
                table: "VendorReview",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_RiderReview",
                table: "RiderReview",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ProductReview",
                table: "ProductReview",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ProductReview_Products_ProductId",
                table: "ProductReview",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ProductReview_Users_CustomerId",
                table: "ProductReview",
                column: "CustomerId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_RiderReview_Users_CustomerId",
                table: "RiderReview",
                column: "CustomerId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_RiderReview_Users_RiderId",
                table: "RiderReview",
                column: "RiderId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_VendorReview_Users_CustomerId",
                table: "VendorReview",
                column: "CustomerId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_VendorReview_Users_VendorId",
                table: "VendorReview",
                column: "VendorId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
