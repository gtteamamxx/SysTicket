using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SysTicket.Infrastructure.Migrations
{
    public partial class Add_Logo_Column_To_Events : Migration
    {
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LogoBase64",
                table: "Events");
        }

        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "LogoBase64",
                table: "Events",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}