GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROC [dbo].[CompensationLabels_DeleteById]
					@Id int
As
/* ----- Test Code -----
	Declare @Id int = 10
	
	Execute [dbo].[CompensationLabels_DeleteById]
			@Id
	
	Select *
	From [dbo].[CompensationLabels]

*/

BEGIN


DELETE FROM [dbo].[CompensationLabels]
      WHERE Id = @Id

END

GO
