using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using scoutsHunt.Models;
using scoutsHunt.Service;

namespace scoutsHunt.Controllers
{
    [ApiController]
    [Route("game")]
    public class GameController : ControllerBase
    {
        private readonly GameService _service;

        public GameController(GameService service)
        {
            _service = service;
        }
        
        [HttpPost]
        public IActionResult CreateGame()
        {
            return Ok(_service.CreateGame());
        }

        [HttpGet]
        [Route("{code}")]
        public IActionResult JoinGame(int code)
        {
            var result = _service.JoinGame(code);

            if (result == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(result);
            }
        }

        [HttpPost]
        [Route("hikers/{id}")]
        public IActionResult AddHikers(List<Hiker> hikers, int id)
        {
            if (_service.AddHikers(hikers, id))
            {
                return Ok();
            }
            else
            {
                return NotFound();
            }
        }

        [HttpGet]
        [Route("start/{id}")]
        public IActionResult StartGame(int id)
        {
            var result = _service.StartGame(id);
            if (result == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(result);
            }
        }
        
        [HttpGet]
        [Route("end/{id}")]
        public IActionResult EndGame(int id)
        {
            var result = _service.EndGame(id);
            if (result == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(result);
            }
        }

        [HttpGet]
        [Route("length/{id}/{length}")]
        public IActionResult ChangeLength(int id, int length)
        {
            if (_service.ChangeLength(id, length))
            {
                return Ok();
            }
            else
            {
                return NotFound();
            }
        }

        [HttpGet]
        [Route("log")]
        public IActionResult log()
        {
            return Ok(System.IO.File.ReadAllText("/home/pi/nohup.out"));
        }
        
    }
}