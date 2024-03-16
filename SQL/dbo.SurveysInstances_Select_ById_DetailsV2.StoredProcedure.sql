GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROC [dbo].[SurveysInstances_Select_ById_DetailsV2]
		@Id int

AS

/* ---------------TEST-------------
	
	 Execute [dbo].[SurveysInstances_Select_ById_DetailsV2] @Id= 36

*/
BEGIN
    
	SELECT	si.Id
			,si.SurveyId
			,s.[Name] AS SurveyName
			,s.StatusId
			,ss.[Name] AS StatusName
			,si.UserId
			,u.FirstName
			,u.LastName
			,u.Mi
			,u.AvatarUrl
			,u.Email
			,Questions = 
				(
				SELECT	sq.Id
						,sq.Question
						,qt.Id AS QuestionTypeId
						,qt.[Name] AS QuestionTypeName
						,AnswerOptions =
							(
							SELECT 
								sqao.Id
								,sqao.[Text]
								,sqao.AdditionalInfo
								,sqao.[Value]
								,pv.[Id] AS PersonalValueId
								,pv.[Name] AS PersonalValueName
							FROM dbo.SurveyQuestionAnswerOptions AS sqao
							INNER JOIN dbo.PersonalValues AS pv
							ON pv.Id = sqao.PersonalValueId

							WHERE sq.Id = sqao.QuestionId 
							FOR JSON PATH
							)
						,Answers = 
							(
							SELECT 
								sa.Id
								,sa.Answer							
							FROM dbo.SurveyAnswers AS sa

							WHERE sa.QuestionId = sq.Id and sa.InstanceId = @Id 
							FOR JSON PATH
							)
		
				FROM dbo.SurveyQuestions AS sq
				INNER JOIN dbo.QuestionTypes AS qt
				ON sq.QuestionTypeId = qt.Id

				WHERE sq.SurveyId = si.SurveyId
				FOR JSON PATH
				)
		 
			,si.[DateCreated]
			,si.[DateModified]

	FROM dbo.SurveysInstances AS si
	INNER JOIN dbo.Surveys AS s ON s.Id = si.SurveyId
	INNER JOIN dbo.SurveyStatus AS ss ON s.StatusId = ss.Id
	INNER JOIN dbo.Users AS u ON si.UserId = u.Id

	WHERE si.Id = @Id

END
GO
