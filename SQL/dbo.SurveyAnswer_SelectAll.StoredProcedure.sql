GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[SurveyAnswer_SelectAll]
					@PageIndex int 
					,@PageSize int
				

as 

/*

		Declare @PageIndex int = 0
				,@PageSize int = 5
				

		Execute [dbo].[SurveyAnswer_SelectAll]
								@PageIndex 
								,@PageSize


					

*/

BEGIN 

		Declare @offSet int = @PageIndex * @PageSize 

		
	SELECT 
	sa.Id
      ,[InstanceId]
      ,sq.Id as QuestionId
      ,[AnswerOptionId]
      ,[Answer]
	  ,AnswerNumber
      ,sa.[DateCreated]
      ,sa.[DateModified]
	  , TotalCount = COUNT(1) OVER() 
	FROM [dbo].[SurveyAnswers] AS sa
	INNER JOIN dbo.SurveysInstances as si on sa.InstanceId = si.Id
	INNER JOIN dbo.SurveyQuestions as sq on sa.QuestionId = sq.Id
	INNER JOIN dbo.SurveyQuestionAnswerOptions as sqao on sqao.Id = sa.AnswerOptionId
	LEFT JOIN dbo.Surveys as s on s.Id= si.SurveyId

		
		ORDER BY sa.Id
		OFFSET @offSet ROWS
		FETCH NEXT @PageSize ROWS ONLY

END
GO
