GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROC [dbo].[Jobs_SelectByJobType]
			@PageIndex int,
			@PageSize int,
			@Query nvarchar (128)
	
/*

DECLARE @PageIndex int = 0
	   ,@PageSize int = 10
	   ,@Query nvarchar(128) = 'Accounting'
	
EXECUTE [dbo].[Jobs_SelectByJobType]
		 @PageIndex 
		,@PageSize
		,@Query

*/

as

BEGIN

DECLARE @offset int = @PageIndex * @PageSize

SELECT j.Id
	  ,j.Title
	  ,j.Description
	  ,j.Requirements
	  ,jt.Id
	  ,jt.Name
	  ,js.Id
	  ,js.Name
	  ,o.Id
	  ,o.Name as Company
	  ,o.Headline
	  ,o.Description
	  ,o.Logo
	  ,l.City
	  ,rs.[Id]
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

	Where js.[Name] = 'Active' AND jt.Name LIKE '%' + @Query + '%'

ORDER by j.DateCreated DESC
offset @offset rows
fetch next @PageSize rows only


END
GO
