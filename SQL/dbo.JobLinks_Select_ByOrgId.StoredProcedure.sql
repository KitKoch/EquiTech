GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[JobLinks_Select_ByOrgId]
				
				 @PageIndex int
				,@PageSize int
				,@OrganizationId int

as

/*   *****TEST CODE*****
 
 Declare @PageIndex int = 0
		,@PageSize int = 2
		,@OrganizationId int = 1

execute [dbo].[JobLinks_Select_ByOrgId]

		 @PageIndex 
		,@PageSize 
		,@OrganizationId 

select *
from dbo.jobs
 
*/


BEGIN

DECLARE @offset int = @PageIndex * @PageSize

SELECT jl.Id
	  ,jl.UniqueCode
      ,jl.TouchCounter
      ,jl.CompleteCounter
      ,jl.IsActive
      ,jl.IsDeleted
	  ,jl.DateCreated
	  ,jl.DateModified
	  ,j.Id      	  
	  ,j.Title
	  ,j.Description
	  ,j.Requirements
	  ,j.JobTypeId
	  ,jt.Name
	  ,j.JobStatusId
	  ,js.Name
	  ,o.id	  
	  ,o.Name
	  ,o.Headline
	  ,o.Description
	  ,o.Logo	  
	  ,o.Phone
	  ,o.SiteUrl
	  ,l.Id
	  ,l.LineOne
	  ,l.LineTwo
	  ,l.City
	  ,l.Zip
	  ,l.Latitude
	  ,l.Longitude
	  ,l.LocationTypeId
	  ,lt.Name
	  ,s.Id
	  ,s.Name
	  ,s.Code
	  ,l.DateCreated
	  ,l.DateModified
	  ,j.RemoteStatusId
	  ,r.Name
	  ,j.ContactName
	  ,j.ContactPhone
	  ,j.ContactEmail
	  ,j.EstimatedStartDate
	  ,j.EstimatedFinishDate
	  ,j.DateCreated
      ,j.DateModified
	  ,j.CreatedBy
      ,j.ModifiedBy 
	  ,TotalCount = COUNT(1) OVER()



  FROM dbo.JobLinks as jl inner join dbo.Jobs as j
					on jl.JobId = j.Id	
					inner join dbo.Organizations as o
					on j.OrganizationId = o.Id
					INNER JOIN dbo.JobStatus as js
					ON js.Id = j.JobStatusId
					INNER JOIN dbo.JobTypes as jT
					on JT.Id = J.JobTypeId
					INNER JOIN dbo.RemoteStatus as r
					ON r.Id = j.RemoteStatusId
					inner join dbo.Locations as l
					on l.Id = j.LocationId
					inner join dbo.LocationTypes as lt
					on lt.Id = l.LocationTypeId
					inner join dbo.States as s
					on l.StateId = s.Id

	Where o.Id = @OrganizationId
	ORDER BY OrganizationId
	offset @offset rows
	fetch next @PageSize rows only


END
GO
