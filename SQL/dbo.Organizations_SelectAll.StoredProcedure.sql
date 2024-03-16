GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[Organizations_SelectAll]
@PageIndex int,
@PageSize int

/*---test---
execute dbo.Organizations_SelectAll 0 , 11

*/
as

begin 

Declare @offset int = @PageIndex * @PageSize

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
	  	  ,TotalCount = count (*) over ()

  FROM dbo.Organizations as o
  inner join dbo.Locations as l
  on o.LocationId = l.Id
  inner join dbo.OrganizationTypes as ot
  on o.OrganizationTypeId = ot.Id
  
  
ORDER BY o.Id

OFFSET @offSet Rows
Fetch Next @PageSize Rows ONLY

end
GO
