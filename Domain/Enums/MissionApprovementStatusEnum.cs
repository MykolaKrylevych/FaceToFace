using System.Text.Json.Serialization;


namespace Domain.Enums
{
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum MissionApprovementStatusEnum
    {
        pending,
        draft,
        approved
    }
}
