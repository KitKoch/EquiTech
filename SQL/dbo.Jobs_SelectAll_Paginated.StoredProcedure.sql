GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[Jobs_SelectAll_Paginated]
			@PageIndex int,
			@PageSize int
	
/*

DECLARE @PageIndex int = 0
		,@PageSize int = 15
	

EXECUTE [dbo].[Jobs_SelectAll_Paginated]
		 @PageIndex 
		,@PageSize 

*/

as

BEGIN

DECLARE @offset int = @PageIndex * @PageSize

SELECT 	j.Id
	  ,j.Title
	  ,j.[Description]
	  ,j.Requirements
	  ,jt.Id as JobTypeId
	  ,jt.[Name] as JobTypeName
	  ,js.Id as JobStatusId
	  ,js.[Name] as JobStatusName
	  ,o.Id as OrganizationId
	  ,o.[Name] as Company
	  ,o.Headline
	  ,o.[Description]
	  ,o.Logo
	  ,o.Phone
	  ,o.SiteUrl
	  ,l.Id as LocationId
	  ,l.LineOne
	  ,l.LineTwo
	  ,l.City
	  ,l.Zip
	  ,l.Latitude
	  ,l.Longitude
	  ,LocationTypeId = (Select lt.[Id]
						 From dbo.LocationTypes as lt
						 Where lt.Id = l.LocationTypeId)
	  ,LocationTypeName = (Select lt.[Name]
						 From dbo.LocationTypes as lt
						 Where lt.Id = l.LocationTypeId)
	  ,s.Id
	  ,s.[Name]
	  ,s.Code
	  ,l.DateCreated
	  ,l.DateModified
	  ,rs.[Id] as RemoteStatusId
	  ,rs.[Name]
      ,j.[ContactName]
      ,j.[ContactPhone]
      ,j.[ContactEmail]
      ,j.[EstimatedStartDate]
      ,j.[EstimatedFinishDate]
      ,j.[DateCreated]
      ,j.[DateModified]
      ,j.[CreatedBy]
      ,j.[ModifiedBy]
	  ,TotalCount = Count(1) OVER()
	FROM dbo.Jobs as j inner join dbo.Locations as l
	on j.LocationId = l.Id
	inner join dbo.JobStatus as js
	on j.JobStatusId = js.Id
	inner join dbo.JobTypes as jt
	on j.JobTypeId = jt.Id
	inner join dbo.Organizations as o
	on j.OrganizationId = o.Id
	inner join dbo.States as s
	on l.StateId = s.Id
	inner join dbo.RemoteStatus as rs
	on j.RemoteStatusId = rs.Id


	Where js.[Name] = 'Active'

ORDER by j.DateCreated DESC
offset @offset rows
fetch next @PageSize rows only


END
GO
