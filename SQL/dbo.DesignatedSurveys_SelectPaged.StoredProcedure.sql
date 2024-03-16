GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[DesignatedSurveys_SelectPaged]
					@PageIndex int
					,@PageSize int
				
AS

/*

DECLARE
		@PageIndex int = 0
		,@PageSize int = 8

EXECUTE dbo.DesignatedSurveys_SelectPaged

		@PageIndex
		,@PageSize
	

*/

BEGIN

	
	DECLARE @Offset int = @PageIndex * @PageSize

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
		,TotalCount = COUNT(1) OVER()

	FROM [dbo].[DesignatedSurveys] AS ds 
	INNER JOIN [dbo].[Surveys] AS s 
		ON ds.SurveyId = s.Id 
	INNER JOIN [dbo].[EntityTypes] AS et
		ON ds.EntityTypeId = et.Id 
	INNER JOIN [dbo].[WorkflowTypes] AS wf 
		ON ds.WorkflowTypeId = wf.Id 
	INNER JOIN [dbo].[Users] AS ucb
		ON ds.CreatedBy = ucb.Id 
	INNER JOIN [dbo].[Users] AS umb
		ON ds.ModifiedBy = umb.Id 
	
	ORDER BY ds.Id
	OFFSET @offset ROWS
	FETCH NEXT @PageSize ROWS ONLY

END
GO
