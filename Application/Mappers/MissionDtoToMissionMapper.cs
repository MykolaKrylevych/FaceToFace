using Application.DTO.Input;
using Application.Interfaces;
using Domain.Entities;

namespace Application.Mappers
{
    public class MissionDtoToMissionMapper : IMapper<MissionInputDto, Mission>
    {
        public Mission Map(MissionInputDto source)
        {
            if (source == null) return null;
            
            //Type type = source.GetType();
            //foreach (var property in type.GetProperties())
            //{
            //    Console.WriteLine($"Property: {property.Name}, Value: {property.GetValue(source)}");
            //} 


            return new Mission() { MissionType = source.MissionType, Question = source.Question, Image= source.Image };
        }
    }
}
