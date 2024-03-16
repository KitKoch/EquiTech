GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc					[dbo].[WorkHistory_Select_ByUserId_Paginated]
							@UserId INT
							,@PageIndex INT
							,@PageSize INT
							

as
/*--TestCode

	DECLARE					@UserId int = 202
							,@PageIndex int = 0
							,@PageSize int = 10

	EXECUTE					[dbo].[WorkHistory_Select_ByUserId_Paginated]
							@UserId
							,@PageIndex
							,@PageSize

*/

BEGIN

	DECLARE					@offset INT = @PageIndex * @PageSize

	SELECT					wh.[Id]
							,wh.[CompanyName]
							,wh.[CompanyContact]
							,wh.[CompanyEmail]
							,wh.[CompanyPhone]
							,l.[LineOne]
							,l.[LineTwo]
							,l.[City]
							,l.[Zip]
							,wh.[UserId]
							,wh.[IndustryId]
							,i.[Name] AS Industry
							,wh.[StartDate]
							,wh.[EndDate]
							,wh.[DateCreated]
							,wh.[DateModified]
							,TotalCount = Count(1) OVER()

	FROM					dbo.[WorkHistory] as wh

								INNER JOIN dbo.[Locations] as l
								ON l.[Id] = wh.[LocationId]

								INNER JOIN dbo.[Industries] as i
								ON i.[Id] = wh.[IndustryId]

	WHERE					wh.UserId = @UserId
	
	ORDER BY				wh.[StartDate] DESC

	OFFSET					@offset ROWS

	FETCH NEXT				@PageSize ROWS ONLY


END
GO
