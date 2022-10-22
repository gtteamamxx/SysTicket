using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SysTicket.Infrastructure.Migrations
{
    public partial class Add_Reservation : Migration
    {
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_EventSeats_Reservations_ReservationId",
                table: "EventSeats");

            migrationBuilder.DropTable(
                name: "Reservations");

            migrationBuilder.DropIndex(
                name: "IX_EventSeats_ReservationId",
                table: "EventSeats");

            migrationBuilder.DropColumn(
                name: "ReservationId",
                table: "EventSeats");
        }

        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "ReservationId",
                table: "EventSeats",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateTable(
                name: "Reservations",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    EventId = table.Column<int>(type: "int", nullable: false),
                    ReservationDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Reservations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Reservations_Events_EventId",
                        column: x => x.EventId,
                        principalTable: "Events",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateIndex(
                name: "IX_EventSeats_ReservationId",
                table: "EventSeats",
                column: "ReservationId");

            migrationBuilder.CreateIndex(
                name: "IX_Reservations_EventId",
                table: "Reservations",
                column: "EventId");

            migrationBuilder.AddForeignKey(
                name: "FK_EventSeats_Reservations_ReservationId",
                table: "EventSeats",
                column: "ReservationId",
                principalTable: "Reservations",
                principalColumn: "Id",
                onDelete: ReferentialAction.NoAction);
        }
    }
}