using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SysTicket.Infrastructure.Migrations
{
    public partial class Add_Event_Seat_2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_EventSeat_Events_EventId",
                table: "EventSeat");

            migrationBuilder.DropPrimaryKey(
                name: "PK_EventSeat",
                table: "EventSeat");

            migrationBuilder.RenameTable(
                name: "EventSeat",
                newName: "EventSeats");

            migrationBuilder.RenameIndex(
                name: "IX_EventSeat_EventId",
                table: "EventSeats",
                newName: "IX_EventSeats_EventId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_EventSeats",
                table: "EventSeats",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_EventSeats_Events_EventId",
                table: "EventSeats",
                column: "EventId",
                principalTable: "Events",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_EventSeats_Events_EventId",
                table: "EventSeats");

            migrationBuilder.DropPrimaryKey(
                name: "PK_EventSeats",
                table: "EventSeats");

            migrationBuilder.RenameTable(
                name: "EventSeats",
                newName: "EventSeat");

            migrationBuilder.RenameIndex(
                name: "IX_EventSeats_EventId",
                table: "EventSeat",
                newName: "IX_EventSeat_EventId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_EventSeat",
                table: "EventSeat",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_EventSeat_Events_EventId",
                table: "EventSeat",
                column: "EventId",
                principalTable: "Events",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}