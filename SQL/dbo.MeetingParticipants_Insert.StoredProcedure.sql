GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE proc [dbo].[MeetingParticipants_Insert]
						@DailyMeetingId int
						,@UserId int
						,@Duration int
						,@Id int OUTPUT


as

/*

Select *
From dbo.MeetingParticipants

Declare @DailyMeetingId int = 5
		,@UserId int = 211
		,@Duration int = 4
		,@Id int = 0


Execute dbo.MeetingParticipants_Insert
						@DailyMeetingId
						,@UserId 
						,@Duration 
						,@Id


Select *
From dbo.MeetingParticipants


*/

BEGIN

INSERT INTO [dbo].[MeetingParticipants]
           ([DailyMeetingId]
           ,[UserId]
           ,[Duration]
			)
     VALUES
           (@DailyMeetingId
			,@UserId 
			,@Duration 
           )
	SET @Id = SCOPE_IDENTITY();

END


GO
