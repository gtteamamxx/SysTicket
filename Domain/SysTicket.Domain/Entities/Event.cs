using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SysTicket.Domain.Entities
{
    public class Event
    {
        public Event(
            int userId,
            string name,
            DateTime start,
            DateTime end,
            string description,
            byte[] coverImage,
            IList<EventImage> images)
        {
            UserId = userId;
            Name = name;
            StartDate = start;
            EndDate = end;
            Description = description;
            CoverImage = coverImage;

            if (images.Any(x => x.EventId != default))
            {
                throw new ArgumentException("Cannot add other event images to new event");
            }

            Images = images;
        }

        internal Event()
        {
        }

        [Required]
        public byte[] CoverImage { get; set; } = default!;

        [Required]
        public string Description { get; set; } = default!;

        [Required]
        public DateTime EndDate { get; set; } = default!;

        [Key]
        public int Id { get; set; }

        public virtual ICollection<EventImage> Images { get; set; } = new HashSet<EventImage>();

        [StringLength(128)]
        public string Name { get; set; } = default!;

        [Required]
        public DateTime StartDate { get; set; } = default!;

        [ForeignKey(nameof(UserId))]
        public virtual User User { get; set; } = default!;

        [Required]
        public int UserId { get; set; } = default!;
    }
}