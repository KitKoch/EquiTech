GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[SurveyStatus_SelectAll]

as

/*

		Execute [dbo].[SurveyStatus_SelectAll]

*/

BEGIN 



		SELECT [Id]
			  ,[Name]
		  FROM [dbo].[SurveyStatus]



END 
GO
