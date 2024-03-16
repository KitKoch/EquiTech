USE [Fairly]
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[SurveyQuestions_SelectByCreatedBy]
		@PageIndex int
		,@PageSize int
		,@UserId int

as
/*

Declare @PageIndex int = 0
,@PageSize int = 3
,@UserId int = 3

Execute [SurveyQuestions_SelectByCreatedBy]
@PageIndex
,@PageSize
,@UserId


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
							inner join dbo.QuestionTypes as qti
				ON sq.QuestionTypeId = qti.Id
								inner join dbo.SurveyTypes as sty
				ON sq.SurveyId = sty.Id
							inner join dbo.StatusTypes as st
				ON sq.StatusId = st.Id

	Where u.Id = @UserId
	ORDER BY U.Id


	OFFSET @offSet Rows
	FETCH Next @PageSize Rows ONLY



END




GO
