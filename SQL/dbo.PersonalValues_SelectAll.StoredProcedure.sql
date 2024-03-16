GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE proc [dbo].[PersonalValues_SelectAll]

as
/*  ++ testing ++
	
	execute dbo.PersonalValues_SelectAll

*/
BEGIN

	SELECT [Id]
		  ,[Name]
	FROM [dbo].[PersonalValues] 

END


GO
