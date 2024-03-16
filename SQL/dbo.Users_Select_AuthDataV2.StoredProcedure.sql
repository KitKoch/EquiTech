GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
 
 CREATE PROC [dbo].[Users_Select_AuthDataV2]
			@Email nvarchar(255)
AS
/*---------------- TEST CODE -----------------

	Declare @Email nvarchar(255) =  'fakeEmail@gmail.com'

	Execute dbo.Users_Select_AuthDataV2
			@Email


	Select u.id, u.email, u.lastname, r.id, r.name, om.organizationId
	From dbo.Users as u 
	left outer join dbo.userroles as ur on ur.userid = u.id
	left outer join dbo.roles as r on r.id = ur.roleid
	left outer join dbo.OrganizationMembers as om on om.userid = u.id

	where email = @email

Select *
From dbo.OrganizationMembers
*/

BEGIN

	SELECT	u.[Id]
			,u.[Email]
			,u.[Password]
			,Roles = 
					(SELECT	r.Name
					 FROM	dbo.Roles as r
							INNER JOIN dbo.UserRoles as ur
								ON r.Id = ur.RoleId
					 WHERE	UserId = u.Id
					 FOR JSON AUTO
					 )
			,o.OrganizationId

	
FROM [dbo].[Users] as u
				LEFT JOIN dbo.OrganizationMembers as o
					on o.UserId = u.Id
			

	WHERE	[Email] = @Email

END
GO
