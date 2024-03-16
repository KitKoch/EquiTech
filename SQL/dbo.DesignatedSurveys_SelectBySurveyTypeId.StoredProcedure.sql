GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[DesignatedSurveys_SelectBySurveyTypeId]
				@SurveyId int
AS

/*
		DECLARE @SurveyId int = 3

		EXECUTE [dbo].[DesignatedSurveys_SelectBySurveyTypeId]
				@SurveyId
*/

BEGIN

SELECT 
		 ds.[Id]
		,ds.[Name]
		,ds.[Version]
		,wf.[Id] as WorkflowTypeId
		,s.[Id] as SurveyId
		,et.[Id] as EntityTypeId
		,ds.[EntityId]
		,ds.[IsDeleted]
		,ucb.Id
		,ucb.FirstName
		,ucb.LastName
		,ucb.Mi
		,ucb.AvatarUrl
		,umb.Id
		,umb.FirstName
		,umb.LastName
		,umb.Mi
		,umb.AvatarUrl
		,ds.[DateCreated]
		,ds.[DateModified]

	FROM [dbo].[DesignatedSurveys] AS ds 
	JOIN [dbo].[Surveys] AS s 
		ON ds.SurveyId = s.Id 
	JOIN [dbo].[EntityTypes] AS et
		ON ds.EntityTypeId = et.Id 
	 JOIN [dbo].[WorkflowTypes] AS wf 
		ON ds.WorkflowTypeId = wf.Id 
	 JOIN [dbo].[Users] AS ucb
		ON ds.CreatedBy = ucb.Id 
	 JOIN [dbo].[Users] AS umb
		ON ds.ModifiedBy = umb.Id 
		
	WHERE s.Id = @SurveyId
	
	ORDER BY DateCreated, IsDeleted 
	
END 
GO
