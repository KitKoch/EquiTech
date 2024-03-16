GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE proc [dbo].[JobApplications_Delete]
						@Id int

as


/*

Select * From [dbo].[JobApplications]

Declare @Id int = 11;

Execute [dbo].[JobApplications_Delete]
					@Id


Select * From [dbo].[JobApplications]

*/


BEGIN

DELETE FROM [dbo].[JobApplications]
      WHERE Id = @Id

END


GO
