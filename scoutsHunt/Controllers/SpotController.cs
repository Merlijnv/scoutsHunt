using Microsoft.AspNetCore.Mvc;
using scoutsHunt.Service;

namespace scoutsHunt.Controllers
{
    [ApiController]
    [Route("spot")]
    public class SpotController : ControllerBase
    {
        private readonly SpotService _service;
        
        public SpotController(SpotService service)
        {
            _service = service;
        }

        [HttpPost]
        [Route("{id}")]
        public IActionResult SpotHiker(int id)
        {
            var result = _service.SpotHiker(id);
            if (result == null)
            {
                return NotFound();
                
            }
            else
            {
                return Ok(result);
            }
        }
    }
}