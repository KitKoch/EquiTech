GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[SurveyAnswers_Update]
			@Id int OUTPUT
			,@InstanceId int
			,@QuestionId int
			,@AnswerOptionId int
			,@Answer nvarchar(500)
			,@AnswerNumber bit
					
as 

/*-------------TEST CODE--------------

	DECLARE	@Id int = 109
			,@InstanceId int = 42
			,@QuestionId int = 20
			,@AnswerOptionId int = null
			,@Answer nvarchar(500) = 'Testing answer'
			,@AnswerNumber bit = 0

	EXEC [dbo].[SurveyAnswers_Update] 
			@Id OUTPUT
			,@InstanceId
			,@QuestionId
			,@AnswerOptionId
			,@Answer
			,@AnswerNumber
		
*/

BEGIN 

    UPDATE [dbo].[SurveyAnswers]

    SET [InstanceId] = @InstanceId
        ,[QuestionId] = @QuestionId
        ,[AnswerOptionId] = @AnswerOptionId
        ,[Answer] = @Answer
        ,[AnswerNumber] = @AnswerNumber
        ,[DateModified] = GETUTCDATE()

    WHERE Id = @Id

END
				
GO
