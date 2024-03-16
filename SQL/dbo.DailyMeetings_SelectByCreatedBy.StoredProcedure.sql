GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[DailyMeetings_SelectByCreatedBy]
							@PageIndex int
							,@PageSize int
							,@CreatedBy int

/*

Select *
From dbo.DailyMeetings

Select *
From dbo.MeetingParticipants


Declare @param1 int = 0
		,@param2 int = 5
		,@CreatedBy int = '8'
Execute [dbo].[DailyMeetings_SelectByCreatedBy]
				@param1
				,@param2
				,@CreatedBy

*/


as


BEGIN

Declare @offset int = @PageIndex * @PageSize;

SELECT d.[Id]
      ,d.[HostId]
      ,d.[DailyId]
      ,d.[RoomName]
      ,d.[Duration]
      ,d.[StartTime]
	  ,m.UserId as ParticipantId
	  ,TotalCount = count(1) over()
  FROM [dbo].[DailyMeetings] as d inner join dbo.MeetingParticipants as m
				on d.Id = m.DailyMeetingId
  Where d.[HostId] = @CreatedBy
  	Order by d.Id
	OFFSET @offset ROWS
	FETCH NEXT @PageSize ROWS ONLY


End

GO
