GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE proc [dbo].[JobApplications_Insert]
						@JobId int
						,@ResumeFileId int
						,@StatusId int
						,@IsWithdrawn bit
						,@CreatedBy int
						,@Id int OUTPUT

as


/*

Select * From [dbo].[JobApplications]

Declare @Id int = '0';

Declare @JobId int = '4'
		,@ResumeFileId int = '4'
		,@StatusId int = '2'
		,@IsWithdrawn bit = 0
		,@CreatedBy int = '8'

Execute dbo.JobApplications_Insert
					@JobId
					,@ResumeFileId
					,@StatusId
					,@IsWithdrawn
					,@CreatedBy
					,@Id OUTPUT


Select * From [dbo].[JobApplications]

*/


BEGIN


INSERT INTO [dbo].[JobApplications]
           ([JobId]
           ,[ResumeFileId]
           ,[StatusId]
           ,[IsWithdrawn]
           ,[CreatedBy]
				)
     VALUES
           (@JobId
			,@ResumeFileId
			,@StatusId
			,@IsWithdrawn
			,@CreatedBy
           )
		SET @Id = SCOPE_IDENTITY();


END


GO
