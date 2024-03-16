GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[SurveyQuestions_Update]
	@Question nvarchar(500)
	,@HelpText nvarchar(255)
	,@IsRequired bit
	,@isMultipleAllowed bit
	,@QuestionTypeId int
	,@SurveyId int
	,@StatusId int
	,@SortOrder int
	,@Id int

as 


BEGIN


UPDATE [dbo].[SurveyQuestions]
SET [Question] = @Question
      ,[HelpText] = @HelpText
	  ,[IsRequired] = @IsRequired
	  ,[isMultipleAllowed] = @isMultipleAllowed
	  ,[QuestionTypeId] = @QuestionTypeId
	  ,[SurveyId] = @SurveyId
	  ,[StatusId] = @StatusId
	  ,[SortOrder] = @SortOrder
	  ,[DateModified] = GETUTCDATE()
WHERE Id = @Id


END


/*
Declare @Id int = 8
		Declare @Question nvarchar(500) = 'new question text'
		,@HelpText nvarchar(255) = 'new help text'

		Execute [dbo].[SurveyQuestions_Update] 
		@Question
		,@HelpText
		,@Id

END




*/


GO
