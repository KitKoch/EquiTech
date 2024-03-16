GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[ShareStory_Delete_ByIdV2]
									@Id int

AS

/* testing
	DECLARE @Id int = 47
	EXECUTE [dbo].[ShareStory_Delete_ByIdV2]
			@Id 


	EXECUTE [dbo].[ShareStory_Select_ByIdV2] @Id


*/

BEGIN	
			DELETE FROM [dbo].[ShareStory]
			WHERE Id = @Id 
END
GO
