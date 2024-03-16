GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[SurveysInstances_Select_ByCreatedBy]
				@PageIndex int 
				,@PageSize int
				,@CreatedBy int 

AS 

/*

		Declare @PageIndex int = 0
				,@PageSize int = 10
				,@CreatedBy int = 8

		Execute [dbo].[SurveysInstances_Select_ByCreatedBy]
					@PageIndex 
					,@PageSize
					,@CreatedBy 
			
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
	
	WHERE si.UserId = @CreatedBy
	ORDER BY si.Id

	OFFSET @offSet Rows
	FETCH Next @PageSize Rows ONLY 

END
GO
