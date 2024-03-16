GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[DailyMeetings_SelectById]
				@Id int

/*

Select *
From dbo.DailyMeetings

Select *
From dbo.MeetingParticipants


Declare @Id int = 2
Execute [dbo].[DailyMeetings_SelectById]
				@Id

*/


as


BEGIN

SELECT d.[Id]
      ,d.[HostId]
      ,d.[DailyId]
      ,d.[RoomName]
      ,d.[Duration]
      ,d.[StartTime]
	  ,m.UserId as ParticipantId
  FROM [dbo].[DailyMeetings] as d inner join dbo.MeetingParticipants as m
				on d.Id = m.DailyMeetingId
  Where d.Id = @Id


End

GO
