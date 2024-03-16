GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



CREATE proc [dbo].[CompensationElements_Delete]
	@Id int
as

/* ----- Test Code -----

	Declare @Id int = 7

	Select *
	From dbo.CompensationElements
	WHERE Id = @id

	Execute dbo.CompensationElements_Delete @Id
	
	Select *
	From dbo.CompensationElements

*/

BEGIN

	DELETE FROM [dbo].[CompensationElements] 
	 
Where [Id] = @Id

END
GO
