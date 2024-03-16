GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE proc [dbo].[Surveys_SelectAll_Paginated]
					@PageIndex int 
					,@PageSize int 
as

/*

		Declare @PageIndex int = 0
				,@PageSize int = 10

		Execute [dbo].[Surveys_SelectAll_Paginated] 
									@PageIndex 
									,@PageSize

*/

BEGIN 

		Declare @offSet int = @PageIndex * @PageSize

		SELECT s.[Id]
			  ,s.[Name]
			  ,[Description]
			  ,ss.[Id]
			  ,ss.[Name]							
			  ,st.[Id]
			  ,st.[Name]
			  ,[CreatedBy]
			  ,u.[FirstName]
			  ,u.[LastName]
			  ,u.[Mi]
			  ,u.[AvatarUrl]
			  ,s.[DateCreated]
			  ,s.[DateModified]
			  , TotalCount = COUNT(1) OVER() 
		  FROM [dbo].[Surveys] as s inner join [dbo].[Users] as u
						ON s.CreatedBy = u.Id
						INNER JOIN
						[dbo].[SurveyStatus] as ss
						ON s.StatusId = ss.Id
						INNER JOIN 
						[dbo].[SurveyTypes] as st
						ON s.SurveyTypeId = st.Id
			
		ORDER BY s.Id

		OFFSET @offSet Rows
		Fetch Next @PageSize Rows ONLY

END 
GO
