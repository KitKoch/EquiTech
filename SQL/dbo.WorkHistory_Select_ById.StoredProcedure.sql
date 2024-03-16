GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc					[dbo].[WorkHistory_Select_ById]
							@Id INT

as
/*--TestCode

	DECLARE					@Id INT = 5

	EXECUTE					[dbo].[WorkHistory_Select_ById]
							@Id

*/

BEGIN


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

	FROM					dbo.[WorkHistory] as wh

								INNER JOIN dbo.[Locations] as l
								ON l.[Id] = wh.[LocationId]

								INNER JOIN dbo.[Industries] as i
								ON i.[Id] = wh.[IndustryId]

	WHERE					wh.Id = @Id


END
GO
