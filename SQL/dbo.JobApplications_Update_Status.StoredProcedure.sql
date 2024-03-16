GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE proc [dbo].[JobApplications_Update_Status]
						@StatusId int
						,@Id int

as

/*

Select * From [dbo].[JobApplications]

Declare @Id int = 10;

Declare @StatusId int = 1

Execute [dbo].[JobApplications_Update_Status]
					@StatusId
					,@Id


Select * From [dbo].[JobApplications]

*/


BEGIN

UPDATE [dbo].[JobApplications]
   SET [StatusId] = @StatusId
      ,[DateModified] = GETUTCDATE()
 WHERE Id = @Id

END


GO
