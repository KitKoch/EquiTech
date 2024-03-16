GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[Surveys_SelectById]
					@Id int 
as 

/*


		Declare @Id int = 1
		Execute [dbo].[Surveys_SelectById]
							@Id

*/


BEGIN 


		SELECT s.[Id]
			  ,s.[Name]
			  ,[Description]
			  ,ss.Id
			  ,ss.Name
			  ,st.Id
			  ,st.Name
			  ,[CreatedBy]
			  ,u.[FirstName]
			  ,u.[LastName]
			  ,u.[Mi]
			  ,u.[AvatarUrl]
			  ,s.[DateCreated]
			  ,s.[DateModified]
		  FROM [dbo].[Surveys] as s inner join [dbo].[Users] as u
						ON s.CreatedBy = u.Id
							INNER JOIN
						[dbo].[SurveyStatus] as ss
						ON s.StatusId = ss.Id
						INNER JOIN 
						[dbo].[SurveyTypes] as st
						ON s.SurveyTypeId = st.Id
		WHERE s.Id = @Id 


END		
GO
