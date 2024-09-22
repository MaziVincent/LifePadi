using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Api.Migrations
{
    /// <inheritdoc />
    public partial class added_logistic_model : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Logistics",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    SenderName = table.Column<string>(type: "text", nullable: true),
                    SenderPhone = table.Column<string>(type: "text", nullable: true),
                    SenderAddress = table.Column<string>(type: "text", nullable: true),
                    ReceiverName = table.Column<string>(type: "text", nullable: true),
                    ReceiverPhone = table.Column<string>(type: "text", nullable: true),
                    ReceiverAddress = table.Column<string>(type: "text", nullable: true),
                    Item = table.Column<string>(type: "text", nullable: true),
                    ItemDescription = table.Column<string>(type: "text", nullable: true),
                    ItemWeight = table.Column<string>(type: "text", nullable: true),
                    OrderId = table.Column<int>(type: "integer", nullable: false),
                    TrackingNumber = table.Column<string>(type: "text", nullable: true),
                    Status = table.Column<string>(type: "text", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Logistics", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Logistics_Orders_OrderId",
                        column: x => x.OrderId,
                        principalTable: "Orders",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Logistics_OrderId",
                table: "Logistics",
                column: "OrderId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Logistics");
        }
    }
}
