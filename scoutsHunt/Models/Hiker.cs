using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace scoutsHunt.Models
{
    public class Hiker
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Name { get; set; }
        public List<Spot> Spots { get; set; } = new List<Spot>();
    }
}