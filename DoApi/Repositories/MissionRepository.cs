using Domain.Entities;
using Domain.Enums;
using Infrastructure.Data;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace DoApi.Repositories
{
    public class MissionRepository: IMissionRepository
    {
        private readonly AppDbContext _context;

        public MissionRepository(AppDbContext db) 
        {
            _context = db;    
        }

        public async Task<bool> AddMissionAsync(Mission mission)
        {
            try
            {
                _context.Missions.Add(mission);
            }
            catch (Exception)
            {

                return false;
            }
            
                
            await _context.SaveChangesAsync();

            return true;
        }

        public Task DeleteMissionAsync(Mission mission)
        {
            // add state deleted without fetching the entity first
            //var mission = new Mission { Id = id };

            //_context.Entry(mission).State = EntityState.Deleted;

            //var item = await _context.Missions.FindAsync(id);
            //if (item == null)
            //{
            //    return false;

            //}
            
            _context.Missions.Remove(mission);
            return Task.CompletedTask;
            }

        public async Task<List<Mission>> GetAllMissionsAsync()
        {
            return await _context.Missions.ToListAsync();
        }

        public async Task<Mission?> GetMissionByIdAsync(int id)
        {
            var mission = await _context.Missions.FindAsync(id);
            return mission;
        }

        public async Task<List<Mission>> GetRandomMissionByStatus(MissionApprovementStatusEnum status, int amount)
        {
            return await _context.Missions.OrderBy(x => Guid.NewGuid()).Where(p => p.Status == status).Take(amount).ToListAsync();
        }

        public Task UpdateMissionAsync(Mission mission)
        {
            _context.Missions.Update(mission);
            return Task.CompletedTask;
        }

        public Task SaveChangesAsync() => 
            _context.SaveChangesAsync();
    }
}
