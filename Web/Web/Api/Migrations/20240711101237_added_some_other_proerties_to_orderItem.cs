using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Api.Migrations
{
    /// <inheritdoc />
    public partial class added_some_other_proerties_to_orderItem : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "OrdersItems",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsFragile",
                table: "OrdersItems",
                type: "boolean",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "OrdersItems",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "Weight",
                table: "OrdersItems",
                type: "double precision",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Type",
                table: "Orders",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DeliveryAddress",
                table: "Deliveries",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                table: "OrdersItems");

            migrationBuilder.DropColumn(
                name: "IsFragile",
                table: "OrdersItems");

            migrationBuilder.DropColumn(
                name: "Name",
                table: "OrdersItems");

            migrationBuilder.DropColumn(
                name: "Weight",
                table: "OrdersItems");

            migrationBuilder.DropColumn(
                name: "Type",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "DeliveryAddress",
                table: "Deliveries");
        }
    }
}
