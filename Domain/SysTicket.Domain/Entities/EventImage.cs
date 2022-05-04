using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SysTicket.Domain.Entities
{
    public class EventImage
    {
        [ForeignKey(nameof(EventId))]
        public virtual Event Event { get; set; } = default!;

        [Required]
        public int EventId { get; set; }

        [Key]
        public int Id { get; set; }

        [Required]
        public byte[] Image { get; set; } = default!;
    }
}