﻿using Microsoft.EntityFrameworkCore;
using SysTicket.Domain.Entities;

namespace SysTicket.Infrastructure
{
    public class SysTicketContext : DbContext
    {
        public SysTicketContext(DbContextOptions<SysTicketContext> options): base(options)
        {

        }

        protected SysTicketContext() { }

        public virtual DbSet<User> Users { get; set; } = default!;
    }
}
