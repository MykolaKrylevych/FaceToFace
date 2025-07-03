using System.ComponentModel.DataAnnotations;
using Domain.Enums;

namespace Domain.Entities
{
    public class Mission
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public required string Question { get; set; }
        [Required]
        public required string Image { get; set; }
        [Required]
        public MissionTypeEnum MissionType { get; set; }
        public MissionApprovementStatusEnum Status { get; set; }
    }
}
