using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Api.Migrations
{
    /// <inheritdoc />
    public partial class added_vendor_category_and_remove_vendorType : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "VendorType",
                table: "Users",
                newName: "OpeningHours");

            migrationBuilder.AddColumn<string>(
                name: "ClosingHours",
                table: "Users",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "VendorCategoryId",
                table: "Users",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Tag",
                table: "Products",
                type: "text",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "VendorCategories",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: true),
                    Description = table.Column<string>(type: "text", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VendorCategories", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Users_VendorCategoryId",
                table: "Users",
                column: "VendorCategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_VendorCategories_VendorCategoryId",
                table: "Users",
                column: "VendorCategoryId",
                principalTable: "VendorCategories",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_VendorCategories_VendorCategoryId",
                table: "Users");

            migrationBuilder.DropTable(
                name: "VendorCategories");

            migrationBuilder.DropIndex(
                name: "IX_Users_VendorCategoryId",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "ClosingHours",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "VendorCategoryId",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "Tag",
                table: "Products");

            migrationBuilder.RenameColumn(
                name: "OpeningHours",
                table: "Users",
                newName: "VendorType");
        }
    }
}
