GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[TeamMembers_SelectAll]

AS

/*

Execute [dbo].[TeamMembers_SelectAll]

*/

BEGIN

		SELECT  T.[UserId]
				,U.FirstName + ' ' + U.LastName as Name

		FROM	[dbo].[TeamMembers] as T
				INNER JOIN dbo.Users as U on U.Id = T.[UserId]

END



GO
