using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using SysTicket.Domain.Interfaces.Common;

namespace SysTicket.Domain.Entities
{
    public class Event : IId
    {
        public Event(
            string title,
            string body,
            DateTime dateFrom,
            DateTime dateTo,
            int userId,
            string logoBase64,
            string layout,
            List<EventPrice> eventPrices)
        {
            Title = title;
            Body = body;
            DateFrom = dateFrom;
            DateTo = dateTo;
            UserId = userId;
            LogoBase64 = logoBase64;
            Layout = layout;
            EventPrices = eventPrices;
        }

        internal Event()
        {
        }

        public string? Body { get; set; }

        public DateTime DateFrom { get; set; }

        public DateTime DateTo { get; set; }

        public virtual ICollection<EventPrice> EventPrices { get; set; } = new HashSet<EventPrice>();

        [Key]
        public int Id { get; set; }

        [Required]
        public string? Layout { get; set; }

        public string? LogoBase64 { get; set; }

        [StringLength(maximumLength: 128)]
        public string? Title { get; set; }

        [ForeignKey(nameof(UserId))]
        public virtual User User { get; set; } = default!;

        public int UserId { get; set; }
    }
}