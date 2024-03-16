GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[SurveysInstances_Select_BySurveyId]				
					@PageIndex int 
					,@PageSize int 
					,@SurveyId int

AS

/* ---------------TEST-------------

	DECLARE	@SurveyId int = 1
			, @PageIndex int = 0
			, @PageSize int = 20

	EXEC [dbo].[SurveysInstances_Select_BySurveyId] 
			@PageIndex,
			@PageSize,
			@SurveyId

*/
BEGIN
    
	DECLARE @Offset int = @PageIndex * @PageSize;
 
	SELECT si.[Id]
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

	WHERE s.Id = @SurveyId
	ORDER BY si.DateCreated DESC 

	OFFSET @Offset ROWS
	FETCH NEXT @PageSize ROWS ONLY;

END
GO
