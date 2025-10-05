using Application.DTO.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Mappers
{
    public static class MissionMapper
    {

        public static MissionResponseDto? ToMissionReponse(this Domain.Entities.Mission entite)
        {
            if (entite == null) return null;

            return new MissionResponseDto
            {
                Id = entite.Id,
                Question = entite.Question,
                Image = entite.Image,
                MissionType = entite.MissionType,
                Status = entite.Status
            };
        }

    }
}
