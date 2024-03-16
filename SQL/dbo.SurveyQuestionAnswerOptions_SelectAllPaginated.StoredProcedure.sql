GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROC [dbo].[SurveyQuestionAnswerOptions_SelectAllPaginated]
@PageIndex int 
,@PageSize int

as


BEGIN


		Declare @offSet int = @PageIndex * @PageSize
		
		
	SELECT s.[Id]
      ,[QuestionId]
      ,[Text]
      ,[Value]
      ,[AdditionalInfo]
      ,[PersonalValueId]
      ,[CreatedBy]
		,TotalCount = Count(1) OVER() 

  FROM [dbo].[SurveyQuestionAnswerOptions] as s  
  inner join [dbo].PersonalValues as p
	ON PersonalValueId = p.Id


  Order BY s.Id


  OFFSET @offSet Rows
  FETCH Next @PageSize Rows ONLY





END

/*




*/


GO
