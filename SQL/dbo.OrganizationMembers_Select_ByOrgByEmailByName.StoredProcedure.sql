GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[OrganizationMembers_Select_ByOrgByEmailByName]
@PageIndex int,
@PageSize int,
@Query nvarchar(100)

/*--test--

[dbo].[OrganizationMembers_Select_ByOrgByEmailByName] 0,3,"email"
select *
from dbo.OrganizationMembers

*/

as

begin

Declare @offset int = @PageIndex * @PageSize

		SELECT 
			om.Id
			,o.Id as OrganizationId
			,o.Name as OrganizaitonName
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

		FROM OrganizationMembers as om
		INNER JOIN Organizations as o on o.Id = om.OrganizationId
		inner join OrganizationTypes as ot on ot.Id = o.OrganizationTypeId
		INNER JOIN Users AS u on u.Id = om.UserId
		inner join UserRoles as ur on ur.UserId = u.Id
		INNER JOIN Roles as r on r.Id = ur.RoleId
		INNER JOIN OrganizationPositionTypes as pt on pt.PositionTypeId = om.PositionType
  


		  where   (o.Name LIKE '%' + @Query + '%' OR 
				 u.FirstName LIKE '%' + @Query + '%' OR 
				 om.OrganizationEmail LIKE '%' + @Query + '%')  
		  order by om.Id
		  OFFSET @offset Rows
		  Fetch next @PageSize  Rows  Only


end
GO
