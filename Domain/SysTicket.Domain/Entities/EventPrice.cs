using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SysTicket.Domain.Entities
{
    public class EventPrice
    {
        public EventPrice(string region, double price)
        {
            Price = price;
            Region = region;
        }

        internal EventPrice()
        {
        }

        [ForeignKey(nameof(EventId))]
        public virtual Event Event { get; set; } = default!;

        public int EventId { get; set; }

        [Key]
        public int Id { get; set; }

        public double Price { get; set; }

        [StringLength(64)]
        [Required]
        public string Region { get; set; } = default!;
    }
}