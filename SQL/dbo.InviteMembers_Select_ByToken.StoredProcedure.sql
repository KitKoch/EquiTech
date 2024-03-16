GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

	
CREATE PROCEDURE [dbo].[InviteMembers_Select_ByToken]
		@Token nvarchar(500)
AS
/*
	
	DECLARE @Token nvarchar(500) = 'nullssss'
	EXECUTE dbo.[InviteMembers_Select_ByToken]
			@Token

*/
BEGIN
		SELECT
			inv.[Id]
			,inv.[FirstName]
			,inv.[LastName]
			,inv.[Email]
			,inv.[Token]
			,inv.[UserRoleTypeId]
				,r.[Name] as [Role]
			,inv.[OrganizationId]
				,o.[Name] as OrganizationName
				,o.[Logo]
			,inv.[ExpirationDate]
			,inv.[CreatedBy]
				,u.[FirstName]
				,u.[LastName]
				,u.[Mi]
				,u.[AvatarUrl]
			,inv.[DateCreated]
		FROM 
			dbo.[InviteMembers] as inv 
			INNER JOIN dbo.[Users] as u
				ON inv.CreatedBy = u.Id
			INNER JOIN dbo.[Roles] as r
				ON inv.[UserRoleTypeId] = r.[Id]
			INNER JOIN dbo.[Organizations] as o
				ON inv.[OrganizationId] = o.Id
		WHERE
			inv.[Token] = @Token
			AND
			inv.ExpirationDate >= getutcdate()
END
GO
