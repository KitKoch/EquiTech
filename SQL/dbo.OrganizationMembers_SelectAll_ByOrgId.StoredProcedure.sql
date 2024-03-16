GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[OrganizationMembers_SelectAll_ByOrgId]
@OrgId int

/*---test---

execute [dbo].[OrganizationMembers_SelectAll_ByOrgId] 2

select *
from dbo.Users

*/
AS

BEGIN

SELECT
	om.Id
	,o.Id as OrganizationId
	,o.Name as OrganizationName
	,o.Description
	,o.Phone
	,o.Logo
	,o.SiteUrl
	,ot.Id
	,ot.Name
	,u.Id
	,u.FirstName
	,u.LastName
	,u.Mi
	,u.Email
	,u.AvatarUrl
	,r.Id as RoleId
	,r.Name as RoleName
	,pt.PositionTypeId as PositionId
	,pt.Name as Position
    ,om.OrganizationEmail
    ,om.DateCreated
    ,om.DateModified

  FROM OrganizationMembers AS om
	INNER JOIN Organizations AS o ON o.Id = om.OrganizationId
	INNER JOIN OrganizationTypes AS ot ON ot.Id = o.OrganizationTypeId
	INNER JOIN Users AS u ON u.Id = om.UserId
	INNER JOIN UserRoles AS ur ON ur.UserId = u.Id
	INNER JOIN Roles AS r ON r.Id = ur.RoleId
	INNER JOIN OrganizationPositionTypes AS pt ON pt.PositionTypeId = om.PositionType
  

  WHERE o.Id = @OrgId
  ORDER BY om.Id

END
GO
