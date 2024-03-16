GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[SurveysInstances_SelectAll]
				@PageIndex int 
				,@PageSize int 

AS

/* ---------------TEST-------------

	Declare @PageIndex int = 0
			,@PageSize int = 10

	Execute [dbo].[SurveysInstances_SelectAll]
			@PageIndex 
			,@PageSize

*/

BEGIN

	DECLARE @offSet int = @PageIndex * @PageSize

    SELECT	si.[Id]
			,[SurveyId]
			,[UserId]
			,u.FirstName
			,u.LastName
			,u.Mi
			,u.AvatarUrl
			,u.Email
			,si.[DateCreated]
			,si.[DateModified]
			,TotalCount = COUNT(1) OVER() 

    FROM [dbo].[SurveysInstances] AS si
    INNER JOIN [dbo].[Surveys] AS s ON si.SurveyId = s.Id
	INNER JOIN [dbo].[Users] AS u ON u.Id = si.UserId
	
	ORDER BY si.Id
	OFFSET @offSet Rows
	Fetch Next @PageSize Rows ONLY

END
GO
