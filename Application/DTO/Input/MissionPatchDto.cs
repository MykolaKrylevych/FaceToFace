using Domain.Enums;
namespace Application.DTO.Input
{
    public class MissionPatchDto
    {
        public required MissionApprovementStatusEnum Status { get; set; }
    }
}
