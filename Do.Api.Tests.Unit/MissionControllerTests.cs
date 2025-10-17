using DoApi.Controllers;
using NSubstitute;
using DoApi.Services;
using Application.DTO.Input;
using Application.Interfaces;
using Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using FluentAssertions;
using Application.Mappers;

namespace Do.Api.Tests.Unit
{
    public class MissionControllerTests
    {
        private readonly MissionController _sut;
        private readonly IMissionService _missionService = Substitute.For<IMissionService>();
        private readonly IMapper<MissionInputDto, Mission> _mapper = Substitute.For<IMapper<MissionInputDto, Mission>>();

        public MissionControllerTests()
        {
            _sut = new MissionController(_mapper, _missionService);
        }


        [Fact]
        public async Task GetById_ReturnOkAndObject_WhenMissionExists()
        {
            // Arrange
            var mission = new Mission
            {
                Id = 1,
                Question = "",
                Image = "",
                MissionType = Domain.Enums.MissionTypeEnum.Emotions,
                Status = Domain.Enums.MissionApprovementStatusEnum.pending
            };
            _missionService.GetMissionByIdAsync(mission.Id).Returns(mission);
            var missionResponse = mission.ToMissionReponse();

            // Act
            var result = (OkObjectResult)await _sut.GetByIdAsync(mission.Id);

            // Assert
            result.StatusCode.Should().Be(200);

            //result.Value.As<Mission>().Should().BeEquivalentTo(mission);
            result.Value.Should().BeEquivalentTo(missionResponse);
        }

        [Fact]
        public async Task GetById_ReturnNotFound_WhenMissionDoesntExist()
        {
            // Arrange
            var missionId = 1;
            _missionService.GetMissionByIdAsync(missionId).Returns((Mission?)null);
            // Act
            var result = (NotFoundResult)await _sut.GetByIdAsync(missionId);
            // Assert
            result.StatusCode.Should().Be(404);
        }

        [Fact]
        public async Task GetAll_ShouldReturnListOfMissions_WhenMissionsExist()
        {
            // Arrange
            var missions = new List<Mission>
            {
                new Mission
                {
                    Id = 1,
                    Question = "",
                    Image = "",
                    MissionType = Domain.Enums.MissionTypeEnum.Emotions,
                    Status = Domain.Enums.MissionApprovementStatusEnum.pending
                },
                new Mission
                {
                    Id = 2,
                    Question = "",
                    Image = "",
                    MissionType = Domain.Enums.MissionTypeEnum.Emotions,
                    Status = Domain.Enums.MissionApprovementStatusEnum.pending
                }
            };
            _missionService.GetAllMissionsAsync().Returns(Task.FromResult(missions));
            // Act
            var result = (OkObjectResult)await _sut.GetAllAsync();
            // Assert
            result.StatusCode.Should().Be(200);
            result.Value.As<List<Mission>>().Should().HaveCount(2);
            result.Value.As<List<Mission>>().Should().BeEquivalentTo(missions);
        }

        [Fact]
        public async Task GetAll_ShouldReturnListOfMissions_WhenOneMissionExist()
        {
            // Arrange
            var missions = new List<Mission>
            {
                new Mission
                {
                    Id = 1,
                    Question = "",
                    Image = "",
                    MissionType = Domain.Enums.MissionTypeEnum.Emotions,
                    Status = Domain.Enums.MissionApprovementStatusEnum.pending
                }
            };
            _missionService.GetAllMissionsAsync().Returns(Task.FromResult(missions));
            // Act
            var result = (OkObjectResult)await _sut.GetAllAsync();
            // Assert
            result.StatusCode.Should().Be(200);
            result.Value.As<List<Mission>>().Should().HaveCount(1);
            result.Value.As<List<Mission>>().Should().BeEquivalentTo(missions);
        }

        //[Fact]
        //public async Task GetAll_ShouldReturnListOfMissions_WhenMultipleMissionsExist()
        //{
        //    // Arrange
        //    var missions = new List<Mission>
        //    {
        //        new Mission
        //        {
        //            Id = 1,
        //            Question = "",
        //            Image = "",
        //            MissionType = Domain.Enums.MissionTypeEnum.Emotions,
        //            Status = Domain.Enums.MissionApprovementStatusEnum.pending
        //        },
        //        new Mission
        //        {
        //            Id = 2,
        //            Question = "",
        //            Image = "",
        //            MissionType = Domain.Enums.MissionTypeEnum.Emotions,
        //            Status = Domain.Enums.MissionApprovementStatusEnum.pending
        //        },
        //        new Mission
        //        {
        //            Id = 3,
        //            Question = "",
        //            Image = "",
        //            MissionType = Domain.Enums.MissionTypeEnum.Emotions,
        //            Status = Domain.Enums.MissionApprovementStatusEnum.pending
        //        }
        //    };
        //    _missionService.GetAllMissionsAsync().Returns(Task.FromResult(missions));
        //    // Act
        //    var result = (OkObjectResult)await _sut.GetAllAsync();
        //    // Assert
        //    result.StatusCode.Should().Be(200);
        //    result.Value.As<List<Mission>>().Should().HaveCount(3);
        //    result.Value.As<List<Mission>>().Should().BeEquivalentTo(missions);
        //}

        [Fact]
        public async Task GetAll_ShouldReturnEmptyList_WhenNoMissionExist()
        {
            // Arrange
            _missionService.GetAllMissionsAsync().Returns(Task.FromResult(new List<Mission>()));

            // Act
            var result = (OkObjectResult) await _sut.GetAllAsync();

            // Assert
            result.StatusCode.Should().Be(200);
            result.Value.As<List<Mission>>().Should().BeEmpty();
        }


    }
}
