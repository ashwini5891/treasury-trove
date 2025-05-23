using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ExportService.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "export");

            migrationBuilder.CreateTable(
                name: "ExportEvents",
                schema: "export",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    Date = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    OrganizationId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ExportEvents", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ExportTransactions",
                schema: "export",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Amount = table.Column<decimal>(type: "numeric", nullable: false),
                    Currency = table.Column<string>(type: "character(3)", fixedLength: true, maxLength: 3, nullable: false),
                    Description = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    Timestamp = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    EventId = table.Column<Guid>(type: "uuid", nullable: false),
                    EventName = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    CategoryId = table.Column<Guid>(type: "uuid", nullable: true),
                    CategoryName = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true),
                    UserProfileId = table.Column<Guid>(type: "uuid", nullable: true),
                    UserProfileName = table.Column<string>(type: "text", nullable: true),
                    OrganizationId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ExportTransactions", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ExportEvents_OrganizationId",
                schema: "export",
                table: "ExportEvents",
                column: "OrganizationId");

            migrationBuilder.CreateIndex(
                name: "IX_ExportTransactions_CategoryId",
                schema: "export",
                table: "ExportTransactions",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_ExportTransactions_EventId",
                schema: "export",
                table: "ExportTransactions",
                column: "EventId");

            migrationBuilder.CreateIndex(
                name: "IX_ExportTransactions_Timestamp",
                schema: "export",
                table: "ExportTransactions",
                column: "Timestamp");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ExportEvents",
                schema: "export");

            migrationBuilder.DropTable(
                name: "ExportTransactions",
                schema: "export");
        }
    }
}
