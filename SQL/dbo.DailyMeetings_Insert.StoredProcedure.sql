GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[DailyMeetings_Insert]
				@HostId int
				,@DailyId nvarchar(255)
				,@RoomName nvarchar(100)
				,@Duration int
				,@Id int OUTPUT

/*

Select *
From dbo.DailyMeetings

Declare @Id int = 0
Declare @HostId int = 8
Declare @DailyId nvarchar(255) = 'DailyIdTesting456'
Declare @RoomName nvarchar(100) = 'RoomNameTest'
Declare @Duration int = 30


Execute [dbo].[DailyMeetings_Insert]
				@HostId
				,@DailyId
				,@RoomName
				,@Duration
				,@Id

Select *
From dbo.DailyMeetings


*/


as


BEGIN

INSERT INTO [dbo].[DailyMeetings]
           ([HostId]
           ,[DailyId]
           ,[RoomName]
           ,[Duration])
     VALUES
           (	
				@HostId
				,@DailyId
				,@RoomName
				,@Duration
				)
		SET @Id = SCOPE_IDENTITY();


End
GO
