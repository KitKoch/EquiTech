GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[SurveyQuestions_SelectById]

			@Id int

as 

/*
Declare @Id int = 8
Execute [dbo].[SurveyQuestions_SelectById] @Id

*/

BEGIN


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

	  FROM [dbo].[SurveyQuestions] as sq inner join [dbo].Users as u
		ON sq.UserId = u.Id
		inner join dbo.QuestionTypes as qti
				ON sq.QuestionTypeId = qti.Id
								inner join dbo.SurveyTypes as sty
				ON sq.SurveyId = sty.Id
							inner join dbo.StatusTypes as st
				ON sq.StatusId = st.Id

		WHERE sq.Id = @Id


END




/*
SELECT [Id]
      ,[UserId]
      ,[Question]
      ,[HelpText]
      ,[IsRequired]
      ,[isMultipleAllowed]
      ,[QuestionTypeId]
      ,[SurveyId]
      ,[StatusId]
      ,[SortOrder]
      ,[DateCreated]
      ,[DateModified]
  FROM [dbo].[SurveyQuestions]

  Old stuff: 


*/


GO
