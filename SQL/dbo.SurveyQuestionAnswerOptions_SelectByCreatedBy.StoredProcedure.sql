GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[SurveyQuestionAnswerOptions_SelectByCreatedBy]
@UserId int

as


BEGIN

		
		
		SELECT s.[Id] as [SurveyId]
      ,[QuestionId]
      ,[Text]
      ,[Value]
      ,[AdditionalInfo]
      ,[PersonalValueId]
	  ,p.[Id]
	  ,p.[Name]
      ,[CreatedBy]

  FROM [dbo].[SurveyQuestionAnswerOptions] as s  inner join [dbo].[Users] as u 
  ON s.CreatedBy = u.Id
  inner join [dbo].PersonalValues as p
  ON PersonalValueId = p.Id

  WHERE CreatedBy = @UserId
  Order BY u.Id





END

/*
Declare @UserId int = 6

execute [dbo].[SurveyQuestionAnswerOptions_SelectByCreatedBy] @UserId

Select *
from dbo.Users
Select *
from dbo.SurveyQuestionAnswerOptions


*/


GO
