GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE proc [dbo].[JobApplications_Update_IsWithdrawn]
						@Id int

as


/*

Select * From [dbo].[JobApplications]

Declare @Id int = 10;

Execute [dbo].[JobApplications_Update_IsWithdrawn]
					@Id


Select * From [dbo].[JobApplications]


*/


BEGIN

UPDATE [dbo].[JobApplications]
		 SET [IsWithdrawn] = CASE WHEN [IsWithdrawn] = 0 THEN 1 ELSE 0 END
		,[DateModified] = GETUTCDATE()
 WHERE Id = @Id

END


GO
