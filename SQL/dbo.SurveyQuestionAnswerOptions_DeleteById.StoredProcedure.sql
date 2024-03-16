GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[SurveyQuestionAnswerOptions_DeleteById]
		@Id int

as


BEGIN


DELETE FROM [dbo].[SurveyQuestionAnswerOptions]
      WHERE Id = @Id


END

/*


GO
*/

GO
