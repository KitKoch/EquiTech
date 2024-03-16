GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[SurveyQuestionAnswerOptions_SelectById]
		@Id int
as 

BEGIN

SELECT s.[Id]
      ,[QuestionId]
      ,[Text]
      ,[Value]
      ,[AdditionalInfo]
      ,[PersonalValueId]
	  ,p.[Id]
	  ,p.[Name]
      ,[CreatedBy]

  FROM [dbo].[SurveyQuestionAnswerOptions] as s  inner join [dbo].PersonalValues as p
  ON PersonalValueId = p.Id

  WHERE s.Id = @Id


END

/*


*/


GO
