using Domain.Entities;
using Domain.Enums;

namespace DoApi.Services
{
    public interface IMissionService
    {
        Task<List<Mission>> GetRandomMissionByStatus(MissionApprovementStatusEnum status, int amount);
        Task<List<Mission>> GetAllMissionsAsync();
        Task<Mission?> GetMissionByIdAsync(int id);
        Task<bool> AddMissionAsync(Mission mission);
        Task<bool> UpdateMissionAsync(Mission mission);
        Task<bool> UpdateMissionStatusAsync(int id, MissionApprovementStatusEnum status);
        Task<bool> DeleteMissionAsync(int id);
    }
}
