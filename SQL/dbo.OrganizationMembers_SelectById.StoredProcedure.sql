GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[OrganizationMembers_SelectById]
@Id int

/*--test--
execute dbo.OrganizationMembers_SelectById 2

select *
from dbo.States
*/

as

begin
 
SELECT 
		om.Id,
		o.Id,
		o.Name,
		ot.Id,
		ot.Name,
		loc.LineOne, 
		loc.LineTwo, 
		loc.City, 
		s.Name, 
		loc.Zip,
		o.Phone,
		o.SiteUrl,
		o.Logo,
		o.Description,
		(
					SELECT 
						u.Id,
						u.FirstName,
						u.LastName,
						u.Mi,
						u.AvatarUrl,
						u.Email,
						(
							SELECT r.Id from Roles r
							WHERE r.Id = ur.RoleId
							
						) as RoleId,
						(
							SELECT r.Name from Roles r
							WHERE r.Id = ur.RoleId
							
						) as RoleName,
						(
							SELECT pt.Id from OrganizationPositionTypes pt
							WHERE pt.Id = om.PositionType
						) as PositionId,
						
						(
							SELECT pt.Name from OrganizationPositionTypes pt
							WHERE pt.PositionTypeId = om.PositionType
						) as PositionName,
						(
							SELECT om.OrganizationEmail from OrganizationMembers om
							WHERE om.Id = @Id
						) as OrganizationEmail
						--r.Name as RoleName,
						--pt.Name as PositionName, 
						--om.OrganizationEmail
					FROM Users AS u
					inner join UserRoles as ur on ur.UserId = u.Id
					INNER JOIN Roles as r on r.Id = ur.RoleId
					INNER JOIN OrganizationPositionTypes as pt on pt.PositionTypeId = om.PositionType
					where om.UserId = u.Id
					for json auto
					)as Members ,
		om.DateCreated,
		om.DateModified

	FROM [dbo].[OrganizationMembers] AS om
	INNER JOIN Organizations AS o ON o.Id = om.OrganizationId
	INNER JOIN Locations AS loc ON loc.id = o.LocationId
	INNER JOIN States AS s ON s.Id = loc.StateId
	INNER JOIN LocationTypes AS lt ON lt.Id = loc.LocationTypeId
	INNER JOIN OrganizationTypes AS ot ON ot.Id = o.OrganizationTypeId

	where om.Id = @Id
end
GO
