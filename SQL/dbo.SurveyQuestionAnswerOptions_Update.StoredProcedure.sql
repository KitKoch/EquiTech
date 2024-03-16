=GO
=SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[SurveyQuestionAnswerOptions_Update]
@QuestionId int 
,@Text nvarchar(500)
,@Value nvarchar(200)
,@AdditionalInfo nvarchar(200)
,@PersonalValueId int
,@CreatedBy int 
,@Id int

as

BEGIN


UPDATE [dbo].[SurveyQuestionAnswerOptions]
   SET [QuestionId] = @QuestionId
      ,[Text] = @Text
      ,[Value] = @Value
      ,[AdditionalInfo] = @AdditionalInfo
      ,[PersonalValueId] = @PersonalValueId
      ,[CreatedBy] = @CreatedBy
      ,[DateModified] = GETUTCDATE()
 WHERE Id = @Id


END



/*


*/


GO
