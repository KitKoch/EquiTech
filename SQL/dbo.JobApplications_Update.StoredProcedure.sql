GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE proc [dbo].[JobApplications_Update]
						@ResumeFileId int
						,@Id int

as


/*

Select * From [dbo].[JobApplications]

Declare @Id int = 10;

Declare @ResumeFileId int = '5'

Execute [dbo].[JobApplications_Update]
					@ResumeFileId
					,@Id


Select * From [dbo].[JobApplications]

*/


BEGIN

UPDATE [dbo].[JobApplications]
   SET [ResumeFileId] = @ResumeFileId
      ,[DateModified] = GETUTCDATE()
 WHERE Id = @Id

END


GO
