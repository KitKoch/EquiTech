GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[SurveyQuestions_SelectAllPaginated]
		@PageIndex int
		,@PageSize int
	

as
/*

	exec [dbo].[SurveyQuestions_SelectAllPaginated] 0, 5



*/



BEGIN

		Declare @offSet int = @PageIndex * @PageSize
		
		
		SELECT sq.[Id]
      ,[UserId] as CreatedById
      ,[Question]
      ,[HelpText]
      ,[IsRequired]
      ,[isMultipleAllowed]
      ,[QuestionTypeId]
	  ,qti.[Name]
      ,[SurveyId]
	  ,sty.[Name]
      ,sq.[StatusId]
	  ,st.[Name]
      ,[SortOrder]
      ,sq.[DateCreated]
      ,sq.[DateModified]
  FROM [dbo].[SurveyQuestions] as sq inner join [dbo].[Users] as u
				ON sq.UserId = u.Id
			inner join dbo.StatusTypes as st
				ON sq.StatusId = st.Id
				inner join dbo.QuestionTypes as qti
				ON sq.QuestionTypeId = qti.Id
				inner join dbo.SurveyTypes as sty
				ON sq.SurveyId = sty.Id

	
	ORDER BY sq.Id


	OFFSET @offSet Rows
	FETCH Next @PageSize Rows ONLY



END




GO
