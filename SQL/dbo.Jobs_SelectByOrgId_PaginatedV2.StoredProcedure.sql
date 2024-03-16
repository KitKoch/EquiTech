GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[Jobs_SelectByOrgId_PaginatedV2]
		@PageIndex int,
		@PageSize int, 
		@OrganizationId int


as


/*

Declare @PageIndex int = 0
		,@PageSize int = 2
		,@OrganizationId int = 1

execute [dbo].[Jobs_SelectByOrgId_Paginated]

		 @PageIndex 
		,@PageSize 
		,@OrganizationId 


*/


BEGIN

DECLARE	@offset int = @PageIndex * @PageSize

SELECT j.Id
	  ,j.Title
	  ,j.Description
	  ,j.Requirements
	  ,jt.Id as JobTypeId
	  ,jt.Name as JobTypeName
	  ,js.Id as JobStatusId
	  ,js.Name as JobStatusName
	  ,o.Id as OrganizationId
	  ,o.Name as Company
	  ,o.Headline
	  ,o.Description
	  ,o.Logo
	  ,l.Id as LocationId
	  ,l.LineOne
	  ,l.LineTwo
	  ,l.City
	  ,l.Zip
	  ,l.Latitude
	  ,l.Longitude
	  ,s.Id as SkillId
	  ,s.Name
	  ,s.Code
	  ,rs.[Id] as RemoteStatusId
	  ,rs.[Name] as RemoteStatus
      ,j.[ContactName]
      ,j.[ContactPhone]
      ,j.[ContactEmail]
      ,j.[EstimatedStartDate]
      ,j.[EstimatedFinishDate]
      ,j.[DateCreated]
      ,j.[DateModified]
      ,j.[CreatedBy]
      ,j.[ModifiedBy]
	  ,[totalCount] = Count(1)over()
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




  Where j.OrganizationId = @OrganizationId

  Order by j.OrganizationId
  offset @offset rows
  fetch next @PageSize rows only


END

GO
