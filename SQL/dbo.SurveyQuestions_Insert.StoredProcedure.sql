GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

 CREATE proc [dbo].[SurveyQuestions_Insert]
 @UserId int
,@Question nvarchar(500)
,@HelpText nvarchar(255)
,@IsRequired bit
,@isMultipleAllowed bit
,@QuestionTypeId int
,@SurveyId int
,@StatusId int
,@SortOrder int
,@Id int OUTPUT


 as
 /*

 DECLARE @Id int = 0;


 DECLARE @UserId int = '11'
 ,@Question nvarchar(500)  = 'What is my first question?'
 ,@HelpText nvarchar(255) = 'Do you need help?'
 ,@IsRequired bit = 'true'
 ,@isMultipleAllowed bit = 'false'
 ,@QuestionTypeId int = '1'
 ,@SurveyId int = '1'
 ,@StatusId int = '1'
 ,@SortOrder int = '1'
 

 Execute [dbo].[SurveyQuestions_Insert]
			@UserId 
           ,@Question
           ,@HelpText 
           ,@IsRequired
           ,@isMultipleAllowed
           ,@QuestionTypeId
           ,@SurveyId
           ,@StatusId
           ,@SortOrder
		   ,@Id OUTPUT
*/

 BEGIN


 INSERT INTO [dbo].[SurveyQuestions]
           ([UserId]
           ,[Question]
           ,[HelpText]
           ,[IsRequired]
           ,[isMultipleAllowed]
           ,[QuestionTypeId]
           ,[SurveyId]
           ,[StatusId]
           ,[SortOrder])
     VALUES
           (@UserId 
           ,@Question
           ,@HelpText 
           ,@IsRequired
           ,@isMultipleAllowed
           ,@QuestionTypeId
           ,@SurveyId
           ,@StatusId
           ,@SortOrder)

		   SET @Id = SCOPE_IDENTITY()


 END

 


GO
