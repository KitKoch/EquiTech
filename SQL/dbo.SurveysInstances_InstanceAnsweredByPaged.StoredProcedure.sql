GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[SurveysInstances_InstanceAnsweredByPaged]
				@PageIndex int
				,@PageSize int

as
/*

DECLARE	@PageIndex int = '0'
		,@PageSize int = '10'

Execute dbo.SurveysInstances_InstanceAnsweredByPaged
		@PageIndex
		,@PageSize

*/

BEGIN

	DECLARE @offset int = @PageIndex * @PageSize

	SELECT 
		sa.Id
		,si.[SurveyId]
		,s.[Name]
		,s.StatusId
		,ss.[Name]
		,s.SurveyTypeId
		,st.[Name]
		,si.[Id] as InstanceId
		,si.[DateCreated]
		,si.[DateModified]
		,si.[UserId]
		,us.FirstName
		,us.LastName
		,us.Mi
		,us.AvatarUrl
		,TotalCount = COUNT(1) OVER()

  FROM [dbo].[SurveysInstances] as si
  inner join dbo.Surveys as s on s.id = si.SurveyId
  inner join dbo.SurveyStatus as ss on ss.id = s.StatusId
  inner join dbo.SurveyTypes as st on st.id = s.SurveyTypeId
  inner join dbo.SurveyAnswers as sa on sa.InstanceId = si.Id
  inner join dbo.Users as us on us.Id = si.UserId

  ORDER BY si.[Id]

	OFFSET @offset ROWS
	FETCH NEXT @PageSize ROWS ONLY

END
GO
