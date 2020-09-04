using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace scoutsHunt.Models
{
    public class Game
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public int Code { get; set; }
        public bool Started { get; set; } = false;
        public bool Ended { get; set; } = false;
        public int Length { get; set; }
        public List<Hiker> Hikers { get; set; } = new List<Hiker>();

        public Game()
        {
            Random r = new Random();
            Code = r.Next(1000, 9999);
            Length = 10;
        }

    }
}