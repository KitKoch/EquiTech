GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[OrganizationMembers_Select_ByOrgId]
@PageIndex int,
@PageSize int,
@Query int

/*---test---

execute [dbo].[OrganizationMembers_Select_ByOrgId] 0,5,1

select *
from dbo.Users

*/
as

begin

Declare @offset int = @PageIndex * @PageSize

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
	,TotalCount = count (*) over ()

  FROM OrganizationMembers AS om
	INNER JOIN Organizations AS o ON o.Id = om.OrganizationId
	INNER JOIN OrganizationTypes AS ot ON ot.Id = o.OrganizationTypeId
	INNER JOIN Users AS u ON u.Id = om.UserId
	INNER JOIN UserRoles AS ur ON ur.UserId = u.Id
	INNER JOIN Roles AS r ON r.Id = ur.RoleId
	INNER JOIN OrganizationPositionTypes AS pt ON pt.PositionTypeId = om.PositionType
  

  where o.Id = @Query
  
  order by om.Id

  OFFSET @offset Rows
  Fetch next @PageSize  Rows  Only

end
GO
