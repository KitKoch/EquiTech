GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



CREATE proc [dbo].[CompensationElements_DeleteByPackageId]
	@CompPackageId int
as

/* ----- Test Code -----

	Declare @CompPackageId int = 149

	Execute [dbo].[CompensationElements_DeleteByPackageId] 
						@CompPackageId
	
	Select *
	From dbo.CompensationElements

*/

BEGIN

	DELETE FROM [dbo].[CompensationElements] 	 
	Where @CompPackageId  = [CompensationPackageId]

END
GO
