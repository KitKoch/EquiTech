GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[SurveyQuestionAnswerOptions_Insert]
@QuestionId int 
,@Text nvarchar(500)
,@Value nvarchar(200)
,@AdditionalInfo nvarchar(200)
,@PersonalValueId int
,@CreatedBy int 
,@Id int OUTPUT


AS


BEGIN


INSERT INTO [dbo].[SurveyQuestionAnswerOptions]
           ([QuestionId]
           ,[Text]
           ,[Value]
           ,[AdditionalInfo]
           ,[PersonalValueId]
           ,[CreatedBy])
     VALUES
           (@QuestionId
           ,@Text
           ,@Value
           ,@AdditionalInfo
           ,@PersonalValueId
           ,@CreatedBy)

		   SET @Id = SCOPE_IDENTITY()



END

/*
DECLARE @Id int = 0;

DECLARE @QuestionId int = 8
,@Text nvarchar(500)= 'What is your quest?'
,@Value nvarchar(200) = '1000'
,@AdditionalInfo nvarchar(200) = ''
,@PersonalValueId int = 2
,@CreatedBy int = 1

Execute [dbo].[SurveyQuestionAnswerOptions_Insert]
@QuestionId
,@Text
,@Value
,@AdditionalInfo
,@PersonalValueId
,@CreatedBy
,@Id OUTPUT

Select *
From [dbo].[SurveyQuestionAnswerOptions]
Select *
from dbo.Users

*/


GO
