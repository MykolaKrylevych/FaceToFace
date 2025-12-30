using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DoApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HealthController : ControllerBase
    {
        [HttpHead]
        public IActionResult Head()
        {
            return Ok();
        }
    }
}