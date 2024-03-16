GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[Goals_Update_IsDeleted]
					@Id int

As

/* ---------- Test Code ----------

	Declare @Id int = 9

	Execute dbo.Goals_Select_ById @Id
			
	Execute dbo.Goals_Update_IsDeleted @Id

	Execute dbo.Goals_Select_ById @Id
	
*/

BEGIN

	Declare @DateNow datetime2(7) = getutcdate()

	Update dbo.Goals
		Set [DateModified] = @DateNow
			,[IsDeleted] = 1

	Where Id = @Id

END
GO
