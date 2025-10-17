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
using DoApi.Services;
using System.Data;
using Application.Mappers;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace DoApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MissionController : ControllerBase
    {
        //private readonly AppDbContext _db;
        private readonly IMapper<MissionInputDto, Mission> _mapper;
        private readonly IMissionService _missionService;

        public MissionController(IMapper<MissionInputDto, Mission> mapper, IMissionService missionService)
        {
            //_db = db;
            _mapper = mapper;
            _missionService = missionService;
        }

        // GET: api/<ValuesController>
        [HttpGet]
        public async Task<IActionResult> GetAllAsync()
        {
            //var missions = await _dbContext.Missions.ToListAsync();
            //return _mapper.Map<List<MissionDto>>(missions);
            return Ok(await _missionService.GetAllMissionsAsync());
        }

        // approved only missions 
        [HttpGet("random")]
        public async Task<List<Mission>> Random(MissionApprovementStatusEnum status = MissionApprovementStatusEnum.approved, int amount = 1)
        {
            return await _missionService.GetRandomMissionByStatus(status , amount);
            // get random mission from db by status 
            //return await _db.Missions.OrderBy(x => Guid.NewGuid()).Where(p=>p.Status == MissionApprovementStatusEnum.approved).Take(1).ToListAsync();
        }

        [HttpGet("pending")]
        public async Task<List<Mission>> ToApprove()
        {
            return await _missionService.GetRandomMissionByStatus(MissionApprovementStatusEnum.pending, 1);
        }

        // GET api/<ValuesController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetByIdAsync(int id)
        {
            var mission = await _missionService.GetMissionByIdAsync(id);

            if (mission == null)
            {
                return NotFound();
            }

            return Ok(mission.ToMissionReponse());
        }

        // POST api/<ValuesController>
        [ProducesResponseType<MissionInputDto>(200)]
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] MissionInputDto value)
        {
            var data = _mapper.Map(value);

            return Ok(await _missionService.AddMissionAsync(data));
        }
        
        [Authorize(Policy = "EmailVerified")]
        [HttpPatch("status/{id}")]
        public async Task<IActionResult> Status(int id, [FromBody] MissionPatchDto dto)
        {
            //var mission = await _db.Missions.FindAsync(id);
            var updateStatus = await _missionService.UpdateMissionStatusAsync(id, dto.Status);

            if (!updateStatus)
                return NotFound();

            return NoContent();

            //if (mission == null)
            //{
            //    return NotFound();
            //}
            
            //mission.Status = dto.Status;
            //await _db.SaveChangesAsync();

            //return Ok(mission);
        }


        // PUT api/<ValuesController>/5
        [Authorize(Policy = "EmailVerified")]
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] MissionInputDto value)
        {
            
            var mission = await _missionService.GetMissionByIdAsync(id);
            
            if (mission == null)
            {
                return NotFound();
            }

            mission.Question = value.Question;
            mission.MissionType = value.MissionType;
            mission.Image = value.Image;

            //_db.Update(mission);
            //await _db.SaveChangesAsync();
            bool status = await _missionService.UpdateMissionAsync(mission);
            if (status)
                return Ok(mission);

            return StatusCode(500, "An error occurred while updating the mission.");
        }

        [Authorize(Policy = "EmailVerified")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {

            bool status = await _missionService.DeleteMissionAsync(id);
            
            if (status)
            {
                return NoContent();
                
            }
            return NotFound();
        }
    }
}
