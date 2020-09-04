using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using scoutsHunt.Models;

namespace scoutsHunt.Service
{
    public class GameService
    {
        private readonly Context _context;

        public GameService(Context context)
        {
            _context = context;
        }
        
        public Game CreateGame()
        {
            var game  = new Game();
            var entity = _context.Games.Add(game).Entity;
            _context.Save();
            return entity;
        }

        public Game JoinGame(int code)
        {
            return _context.Games
                .Include(g => g.Hikers).ThenInclude(h => h.Spots)
                .FirstOrDefault(game => game.Code == code);
        }

        public bool AddHikers(List<Hiker> hikers, int id)
        {
            var game = _context.Games
                .Include(g => g.Hikers)
                .FirstOrDefault(game => game.Id == id);
            
            if (game == null)
            {
                return false;
            }

            var oldHikers = game.Hikers;
            if(oldHikers != null)
                _context.Hikers.RemoveRange(oldHikers);
            
            game.Hikers.Clear();
            game.Hikers = hikers;
            _context.Hikers.AddRange(hikers);
            //_context.Games.Update(game);
            _context.Save();
            return true;
        }

        public Game StartGame(int id)
        {
            var game = _context.Games
                .Include(g => g.Hikers).ThenInclude(h => h.Spots)
                .FirstOrDefault(game => game.Id == id && !game.Started);
            if (game == null || game.Started)
            {
                return null;
            }

            game.Started = true;
            _context.Save();

            return game;
        }

        public Game EndGame(int id)
        {
            var game = _context.Games
                .Include(g => g.Hikers).ThenInclude(h => h.Spots)
                .FirstOrDefault(game => game.Id == id && game.Started && !game.Ended);
            if (game == null)
            {
                return null;
            }

            game.Ended = true;
            _context.Save();

            return game;
        }

        public bool ChangeLength(int id, int length)
        {
            var game = _context.Games.FirstOrDefault(g => g.Id == id && !g.Started);
            if (game == null)
            {
                return false;
            }

            game.Length = length;
            _context.Games.Update(game);
            _context.Save();
            return true;
        }
        
      
    }
}