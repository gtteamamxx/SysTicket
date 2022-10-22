using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SysTicket.Infrastructure.Migrations
{
    public partial class Change_Reservation_Time : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ReservationTime",
                table: "EventSeats");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "ReservationTime",
                table: "EventSeats",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }
    }
}