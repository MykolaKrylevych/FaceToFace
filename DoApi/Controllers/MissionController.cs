using Microsoft.AspNetCore.Mvc;
using Application.DTO.Input;
using Application.DTO.Response;
using Infrastructure.Data;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Metadata.Ecma335;
using Application.Interfaces;
using Domain.Enums;
using Microsoft.AspNetCore.Authorization;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace DoApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MissionController : ControllerBase
    {
        private readonly AppDbContext _db;
        private readonly IMapper<MissionInputDto, Mission> _mapper;


        public MissionController(AppDbContext db, IMapper<MissionInputDto, Mission> mapper)
        {
            _db = db;
            _mapper = mapper;

        }

        // GET: api/<ValuesController>
        [HttpGet]
        public async Task<List<Mission>> Get()
        {
            //var missions = await _dbContext.Missions.ToListAsync();
            //return _mapper.Map<List<MissionDto>>(missions);

            return await _db.Missions.ToListAsync();
        }

        
        [HttpGet("random")]
        public async Task<List<Mission>> Random()
        {
            return await _db.Missions.OrderBy(x => Guid.NewGuid()).Where(p=>p.Status == MissionApprovementStatusEnum.approved).Take(1).ToListAsync();
        }

        // GET api/<ValuesController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var mission = await _db.Missions.FindAsync(id);

            if (mission == null)
            {
                return NotFound();
            }

            return Ok(mission);
        }

        // POST api/<ValuesController>
        [ProducesResponseType<MissionInputDto>(200)]
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] MissionInputDto value)
        {
            var data = _mapper.Map(value);

            _db.Missions.Add(data);
            await _db.SaveChangesAsync();
            return Ok(data);
        }
        
        [Authorize(Policy = "EmailVerified")]
        [HttpPatch("approve/{id}")]
        public async Task<IActionResult> Approve(int id, [FromBody] MissionPatchDto dto)
        {
            var mission = await _db.Missions.FindAsync(id);  

            if (mission == null)
            {
                return NotFound();
            }
            
            mission.Status = dto.Status;
            await _db.SaveChangesAsync();

            return Ok(mission);
        }


        // PUT api/<ValuesController>/5
        [Authorize(Policy = "EmailVerified")]
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] MissionInputDto value)
        {
            var mission = await _db.Missions.FindAsync(id);
            
            if (mission == null)
            {
                return NotFound();
            }

            mission.Question = value.Question;
            mission.MissionType = value.MissionType;
            mission.Image = value.Image;

            _db.Update(mission);
            await _db.SaveChangesAsync();
            
            return Ok(mission);
        }

        [Authorize(Policy = "EmailVerified")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var item = await _db.Missions.FindAsync(id);
            if (item == null)
            {
                return NotFound(); 
            }
            _db.Missions.Remove(item);
            await _db.SaveChangesAsync();
            
            return NoContent();
               
        }
    }
}
