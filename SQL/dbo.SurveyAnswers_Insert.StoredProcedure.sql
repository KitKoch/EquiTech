GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[SurveyAnswers_Insert]
    @InstanceId int,
    @QuestionId int,
    @AnswerOptionId int,
    @Answer nvarchar(500),
    @AnswerNumber bit,
    @Id int OUTPUT
AS


/* 

	DECLARE	@InstanceId int = 37,
			@QuestionId int = 8,
			@AnswerOptionId int = null,
			@Answer nvarchar(500) = 'new next answer',
			@AnswerNumber bit = 1,
			@Id int = 0

	EXECUTE [dbo].[SurveyAnswers_Insert]
			@InstanceId 
			,@QuestionId 
			,@AnswerOptionId
			,@Answer 
			,@AnswerNumber 
			,@Id = @Id OUTPUT

*/


BEGIN

    INSERT INTO [dbo].[SurveyAnswers] (
        [InstanceId],
        [QuestionId],
        [AnswerOptionId],
        [Answer],
        [AnswerNumber]
       
    ) VALUES (
        @InstanceId,
        @QuestionId,
        @AnswerOptionId,
        @Answer,
        @AnswerNumber
      
    );

    SET @Id = SCOPE_IDENTITY();

END
GO
