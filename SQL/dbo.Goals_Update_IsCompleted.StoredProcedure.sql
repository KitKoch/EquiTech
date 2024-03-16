GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[Goals_Update_IsCompleted]
								@Id int


as

/* ---------- Test Code ----------

	Declare @Id int = 8

	Execute dbo.Goals_Select_ById @Id
			
	Execute dbo.Goals_Update_IsCompleted @Id

	Execute dbo.Goals_Select_ById @Id

*/

BEGIN

	Declare @DateNow datetime2(7) = getutcdate();

	Update dbo.Goals
	   Set [DateModified] = @DateNow
		   ,[IsCompleted] = 1
			
	Where Id = @Id

END
GO
