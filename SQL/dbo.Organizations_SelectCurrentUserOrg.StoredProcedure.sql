GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[Organizations_SelectCurrentUserOrg]

@UserId int
	
as

/* ----- Test Code -----
	
	Execute [dbo].[Organizations_SelectCurrentUserOrg]
	@UserId = 202

	Select * from dbo.OrganizationMembers
	

*/

BEGIN

SELECT o.Id
	  ,ot.Id as TypeId
      ,ot.Name as OrganizationType
      ,o.Name
      ,o.Headline
      ,o.Description
      ,o.Logo
      ,l.LineOne
	  ,l.LineTwo
	  ,l.City
	  ,l.Zip
      ,o.Phone
      ,o.SiteUrl
      ,o.DateCreated
      ,o.DateModified
      ,o.CreatedBy
	  ,o.IsValidated
  FROM Organizations as o 
  inner join dbo.Locations as l
  on o.LocationId = l.Id
  inner join dbo.OrganizationTypes as ot
  on o.OrganizationTypeId = ot.Id

INNER JOIN Organizationmembers om ON om.OrganizationId = o.Id
INNER JOIN Users u ON om.UserId = u.Id

WHERE @UserId = u.Id

END
GO
