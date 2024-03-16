GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[Locations_Select_ById]
								@Id int

as


/*

Declare @Id int = 7
Execute [dbo].[Locations_Select_ById] @Id

*/


BEGIN

SELECT l.[Id]
	  ,lt.Id  as LocationTypeId
	  ,lt.Name as LocationTypeName
      ,[LineOne]
      ,[LineTwo]
      ,[City]
      ,[Zip]
      ,[StateId]
      ,[Latitude]
      ,[Longitude]
      ,l.[DateCreated]
      ,l.[DateModified]
      ,u.Id as CreatedById
	  ,u.FirstName as CreatedByFirstName
	  ,u.LastName as CreatedByLastName
	  ,u.Mi as Mi
	  ,u.AvatarUrl
      ,[ModifiedBy]
	  ,TotalCount = count(1) over()
  FROM [dbo].[Locations] as l inner join dbo.LocationTypes as lt
				on l.LocationTypeId = lt.Id inner join dbo.Users as u
					on l.CreatedBy = u.Id
  Where  l.[Id] = @Id 

END

GO
