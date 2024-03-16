GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE proc [dbo].[DailyMeetings_DeleteById]
				@Id int

/*

Select *
From dbo.DailyMeetings

Declare @Id int = 13



Execute [dbo].[DailyMeetings_DeleteById]
				@Id

Select *
From dbo.DailyMeetings


*/


as


BEGIN

DELETE FROM [dbo].[DailyMeetings]
      WHERE Id = @Id


End

GO
