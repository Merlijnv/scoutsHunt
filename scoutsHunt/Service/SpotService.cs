using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using scoutsHunt.Models;

namespace scoutsHunt.Service
{
    public class SpotService
    {
        private readonly Context _context;

        public SpotService(Context context)
        {
            _context = context;
        }

        public string SpotHiker(int id)
        {
            var hiker = _context.Hikers.Include(h => h.Spots).FirstOrDefault(h => h.Id == id);
            if (hiker == null)
            {
                return null;
            }
            
            //find game for the time
            var game = _context.Games.FirstOrDefault(g => g.Hikers.Contains(hiker));

            if (game == null)
            {
                return null;
            }

            if (hiker.Spots.Exists(spot => spot.SpotMoment.AddMinutes(game.Length) > DateTime.Now))
            {
                return "Hikers has been spotted, they are free to go.";
            }
            
            hiker.Spots.Add(new Spot());
            _context.Hikers.Update(hiker);
            _context.Save();
            return "Hiker is spotted, take those points.";
        }
    }
}