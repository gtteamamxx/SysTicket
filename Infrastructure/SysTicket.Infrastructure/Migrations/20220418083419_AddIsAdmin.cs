using Microsoft.EntityFrameworkCore.Migrations;
using System.Diagnostics.CodeAnalysis;

#nullable disable

namespace SysTicket.Infrastructure.Migrations
{
    [ExcludeFromCodeCoverage]
    public partial class AddIsAdmin : Migration
    {
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsAdmin",
                table: "Users");
        }

        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsAdmin",
                table: "Users",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.Sql("UPDATE Users SET IsAdmin = 1");
        }
    }
}