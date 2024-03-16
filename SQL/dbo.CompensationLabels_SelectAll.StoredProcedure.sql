GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE proc [dbo].[CompensationLabels_SelectAll]

	
as

/* ----- Test Code -----
	
	Execute [dbo].[CompensationLabels_SelectAll]
	

*/

BEGIN

Select 
[Id],
[Name],
[Description] 
	 
From [dbo].[CompensationLabels]

END
GO
