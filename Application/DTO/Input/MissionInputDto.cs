using Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Application.DTO.Input
{
    public class MissionInputDto
    {
        public required string Question { get; set; }
        public required MissionTypeEnum MissionType { get; set; }
        public required string Image { get; set; }
    }
}
