using Domain.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTO.Response
{
    public class MissionResponseDto
    {
        public int Id { get; set; }
        public required string Question { get; set; }
        public required string Image { get; set; }
        public MissionTypeEnum MissionType { get; set; }
        public MissionApprovementStatusEnum Status { get; set; }

    }
}
