GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[SurveyTypes_SelectAll]

as

/*

		Execute [dbo].[SurveyTypes_SelectAll]

*/

BEGIN 





		SELECT [Id]
			  ,[Name]
		  FROM [dbo].[SurveyTypes]


END 
GO
