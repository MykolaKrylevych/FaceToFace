using Domain.Entities;
using Domain.Enums;


namespace DoApi.Repositories
{
    public interface IMissionRepository
    {
        Task<List<Mission>> GetRandomMissionByStatus(MissionApprovementStatusEnum status, int amount);
        Task<List<Mission>> GetAllMissionsAsync();
        Task<Mission?> GetMissionByIdAsync(int id);
        Task<bool> AddMissionAsync(Mission mission);
        Task UpdateMissionAsync(Mission mission);
        Task SaveChangesAsync();
        Task DeleteMissionAsync(Mission mission);
    }
}
