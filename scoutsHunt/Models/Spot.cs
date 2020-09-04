using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace scoutsHunt.Models
{
    public class Spot
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public DateTime SpotMoment { get; set; }

        public Spot()
        {
            SpotMoment = DateTime.Now;
        }
    }
}