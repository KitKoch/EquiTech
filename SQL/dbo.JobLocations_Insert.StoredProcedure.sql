GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[JobLocations_Insert]
	@JobId int
	,@LocationId int
	,@CreatedBy int
	


/*--test---

Declare @JobId int = 5
	,@LocationId int = 188
	,@CreatedBy int = 6


	execute [dbo].[JobLocations_Insert]

	@JobId
	,@LocationId
	,@CreatedBy


	select *
	from dbo.JobLocations


*/
as

begin

DECLARE @DateCreated datetime2(7) = GETUTCDATE()

SET IDENTITY_INSERT [dbo].[JobLocations] ON

INSERT INTO [dbo].[JobLocations]
           ([JobId]
           ,[LocationId]
           ,[CreatedBy]
		   ,[DateCreated])

     VALUES
           (@JobId
           ,@LocationId
           ,@CreatedBy
		   ,@DateCreated)

SET IDENTITY_INSERT [dbo].[JobLocations] OFF

end
GO
