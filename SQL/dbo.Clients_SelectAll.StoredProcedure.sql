GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[Clients_SelectAll]

as

/*

Execute [dbo].[Clients_SelectAll]

*/


BEGIN

		SELECT	app.[ClientId] 
				,us.FirstName + ' ' + us.LastName as Name

		FROM	[dbo].[Appointments] as app
				INNER JOIN dbo.Users as us on app.ClientId = us.Id

		GROUP BY app.ClientId, us.FirstName, us.LastName

END
GO
