using System.Text.Json.Serialization;

namespace Domain.Enums
{
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum MissionTypeEnum
    {
        Values,
        Emotions,
        Relationships,
        Future,
        Experiences
    }
}
