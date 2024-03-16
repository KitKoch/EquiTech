GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[Organizations_SelectId_ByUserId]

@UserId int
	
as

/* ----- Test Code -----
	DECLARE @UserId int = 212
	Execute [dbo].[Organizations_SelectId_ByUserId]
	@UserId

	Select * from dbo.OrganizationMembers
	WHERE UserId = @UserId

*/

BEGIN

		SELECT o.Id
		FROM Organizations as o
			INNER JOIN Organizationmembers om 
		ON om.OrganizationId = o.Id
			INNER JOIN Users u
		ON om.UserId = u.Id

		WHERE @UserId = u.Id

END
GO
