GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[Locations_SelectAll]
							@PageIndex int
							,@PageSize int

as

/*
Declare @param1 int = 0
		,@param2 int = 5
		

Execute [dbo].[Locations_SelectAll] @param1,@param2

Select *
From dbo.Users

Select *
From dbo.Locations
*/


BEGIN


Declare @offset int = @PageIndex * @PageSize;

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
	Order by l.Id
	OFFSET @offset ROWS
	FETCH NEXT @PageSize ROWS ONLY


END

GO
