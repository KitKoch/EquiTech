GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[SurveysInstances_SelectById]
			@Id int

AS

/* ---------------TEST-------------

	DECLARE @Id int = 33

	Execute [dbo].[SurveysInstances_SelectById] @Id
	 
*/
BEGIN
    
	SELECT	si.[Id]
			,si.[SurveyId]
			,si.[UserId] 
			,u.FirstName
			,u.LastName
			,u.Mi
			,u.AvatarUrl
			,u.Email
			,si.[DateCreated]
			,si.[DateModified]

    FROM [dbo].[SurveysInstances] AS si
    INNER JOIN [dbo].[Surveys] AS s ON si.SurveyId = s.Id
	INNER JOIN [dbo].[Users] AS u ON u.Id = si.UserId
    
	WHERE si.Id = @Id

END
GO
