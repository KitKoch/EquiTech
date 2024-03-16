GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE proc [dbo].[CompensationTypes_SelectAll]

	
as

/* ----- Test Code -----
	
	Execute [dbo].[CompensationTypes_SelectAll]
	

*/

BEGIN

Select 
[Id],
[Name]
	 
From [dbo].[CompensationTypes]

END
GO
