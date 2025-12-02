using DoApi.Logging;
using DoApi.Repositories;
using Domain.Entities;
using Domain.Enums;
using System.Diagnostics;

namespace DoApi.Services
{
    public class MissionService : IMissionService
    {
        private readonly IMissionRepository _missionRepository;
        private readonly ILoggerAdapter<MissionService> _logger;

        public MissionService(IMissionRepository missionRepository, ILoggerAdapter<MissionService> logger) 
        {
            _missionRepository = missionRepository;
            _logger = logger;
        }
        public async Task<bool> AddMissionAsync(Mission mission)
        {
            return await _missionRepository.AddMissionAsync(mission); ;
        }

        public async Task<bool> DeleteMissionAsync(int id)
        {
            var mission = await GetMissionByIdAsync(id);
            
            if (mission == null)
                return false;

            _logger.LogInformation($"Deleting mission with id: {mission.Id}");
            var stopWatch = Stopwatch.StartNew();
            try
            {
                await _missionRepository.DeleteMissionAsync(mission);
                await _missionRepository.SaveChangesAsync();
            }
            catch (Exception e)
            {
                _logger.LogError(e, $"Something went wrong while Deleting mission with id: {mission.Id}");
                return false;
            }
            finally
            {

                stopWatch.Stop();
                _logger.LogInformation($"Mission Deleted in {stopWatch.ElapsedMilliseconds}ms with id:{mission.Id}");
            }


            return true;
        }

        public async Task<List<Mission>> GetAllMissionsAsync()
        {
            _logger.LogInformation("Retrieving all missions");
            var stopWatch = Stopwatch.StartNew();
            try
            {
                return await _missionRepository.GetAllMissionsAsync();
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Something went wrong while retrieving all missions");
                throw;
            }
            finally
            {
                stopWatch.Stop();
                _logger.LogInformation("All missions retrieved in {0}ms", stopWatch.ElapsedMilliseconds);
            }
        }

        public async Task<Mission?> GetMissionByIdAsync(int id)
        {
            _logger.LogInformation($"Retrieving mission with id: {id}");
            var stopWatch = Stopwatch.StartNew();
            try
            {
                return await _missionRepository.GetMissionByIdAsync(id);
            }
            catch (Exception e)
            {
                _logger.LogError(e, $"Something went wrong while retrieving mission with id: {id}");
                throw;
            }
            finally
            {

                stopWatch.Stop();
                _logger.LogInformation($"Mission retrieved in {stopWatch.ElapsedMilliseconds}ms with id:{id}");
            }


        }

        public Task<List<Mission>> GetRandomMissionByStatus(MissionApprovementStatusEnum status, int amount)
        {
            _logger.LogInformation($"Retrieving {amount} random missions");
            var stopWatch = Stopwatch.StartNew();
            try
            {
                return _missionRepository.GetRandomMissionByStatus(status, amount);
            }
            catch (Exception e)
            {
                _logger.LogError(e, $"Something went wrong while retrieving {amount} random missions");
                throw;
            }
            finally
            {

                stopWatch.Stop();
                _logger.LogInformation($" {amount} random missions retrieved in {stopWatch.ElapsedMilliseconds}ms");
            }
        }

        public async Task<bool> UpdateMissionStatusAsync(int id, MissionApprovementStatusEnum newStatus)
        {
            var mission = await _missionRepository.GetMissionByIdAsync(id);
            if (mission == null)
                return false;

            mission.Status = newStatus;

            await _missionRepository.UpdateMissionAsync(mission);
            await _missionRepository.SaveChangesAsync();


            return true;
        }

        public async Task<bool> UpdateMissionAsync(Mission mission)
        {
            _logger.LogInformation($"Updaing mission with id: {mission.Id}");
            var stopWatch = Stopwatch.StartNew();
            try
            {
                await _missionRepository.UpdateMissionAsync(mission);
                await _missionRepository.SaveChangesAsync();
            }
            catch (Exception e)
            {
                _logger.LogError(e, $"Something went wrong while Updaing mission with id: {mission.Id}");
                return false;
            }
            finally
            {

                stopWatch.Stop();
                _logger.LogInformation($"Mission updated in {stopWatch.ElapsedMilliseconds}ms with id:{mission.Id}");
            }


            return true;
        }
    }
}
