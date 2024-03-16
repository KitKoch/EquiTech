GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[SurveyAnswers_Select_ByCreatedBy]
				@PageIndex int 
				,@PageSize int
				,@CreatedBy int 

AS 

/*

	Declare @PageIndex int = 0
			,@PageSize int = 10
			,@CreatedBy int = 3

	Execute [dbo].[SurveyAnswers_Select_ByCreatedBy]
			@PageIndex 
			,@PageSize
			,@CreatedBy											

*/

BEGIN 

	DECLARE @offSet int = @PageIndex * @PageSize 

	SELECT sa.[Id]
		   ,sa.[InstanceId] 
		   ,sa.[QuestionId]
		   ,sa.[AnswerOptionId]
		   ,sa.[Answer]
		   ,sa.[AnswerNumber]
		   ,sa.[DateCreated]
		   ,sa.[DateModified]
		   ,TotalCount = COUNT(1) OVER()

	FROM [dbo].[SurveyAnswers] as sa 
	inner join dbo.SurveysInstances as si
	ON si.Id = sa.InstanceId
	inner join dbo.SurveyQuestions as sq on sq.Id=sa.QuestionId
	inner join dbo.SurveyQuestionAnswerOptions as sqao on sqao.Id = sa.AnswerOptionId
	inner join dbo.Surveys as s on s.id = si.SurveyId

	WHERE si.UserId = @CreatedBy
	ORDER BY sa.Id

	OFFSET @offSet Rows
	FETCH Next @PageSize Rows ONLY 

END
GO
