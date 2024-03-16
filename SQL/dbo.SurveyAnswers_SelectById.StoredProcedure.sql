GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[SurveyAnswers_SelectById]
			@Id int

/*

	Declare @Id int = 86

	Execute [dbo].[SurveyAnswers_SelectById] @Id

*/

as 


BEGIN

	SELECT	sa.[Id]
			,sa.[InstanceId]
			,sa.[QuestionId]
			,[AnswerOptionId]
			,[Answer]
			,[AnswerNumber]
			,sa.[DateCreated]
			,sa.[DateModified]

	FROM [dbo].[SurveyAnswers] as sa 
	inner join dbo.SurveysInstances as si on sa.InstanceId = si.Id
	inner join dbo.SurveyQuestions as sq on sq.Id= sa.QuestionId
	left join dbo.Surveys as s on s.Id = si.SurveyId

	WHERE sa.Id= @Id
  
END


GO
