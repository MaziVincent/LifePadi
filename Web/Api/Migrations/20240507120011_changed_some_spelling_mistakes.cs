using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Api.Migrations
{
    /// <inheritdoc />
    public partial class changed_some_spelling_mistakes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Addressses_Users_CustomerId",
                table: "Addressses");

            migrationBuilder.DropForeignKey(
                name: "FK_Addressses_Users_UserId",
                table: "Addressses");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Addressses",
                table: "Addressses");

            migrationBuilder.RenameTable(
                name: "Addressses",
                newName: "Addresses");

            migrationBuilder.RenameIndex(
                name: "IX_Addressses_UserId",
                table: "Addresses",
                newName: "IX_Addresses_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_Addressses_CustomerId",
                table: "Addresses",
                newName: "IX_Addresses_CustomerId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Addresses",
                table: "Addresses",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Addresses_Users_CustomerId",
                table: "Addresses",
                column: "CustomerId",
                principalTable: "Users",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Addresses_Users_UserId",
                table: "Addresses",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Addresses_Users_CustomerId",
                table: "Addresses");

            migrationBuilder.DropForeignKey(
                name: "FK_Addresses_Users_UserId",
                table: "Addresses");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Addresses",
                table: "Addresses");

            migrationBuilder.RenameTable(
                name: "Addresses",
                newName: "Addressses");

            migrationBuilder.RenameIndex(
                name: "IX_Addresses_UserId",
                table: "Addressses",
                newName: "IX_Addressses_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_Addresses_CustomerId",
                table: "Addressses",
                newName: "IX_Addressses_CustomerId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Addressses",
                table: "Addressses",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Addressses_Users_CustomerId",
                table: "Addressses",
                column: "CustomerId",
                principalTable: "Users",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Addressses_Users_UserId",
                table: "Addressses",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
