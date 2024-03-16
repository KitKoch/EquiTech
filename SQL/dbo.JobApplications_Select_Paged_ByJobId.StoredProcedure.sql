GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE proc [dbo].[JobApplications_Select_Paged_ByJobId]
								@PageIndex int,
								@PageSize int,
								@JobId int

as


/*

	Declare @JobId int = 4,
	@PageIndex int = 0,
	@PageSize int = 36

Execute [dbo].[JobApplications_Select_Paged_ByJobId]
								@PageIndex
								,@PageSize
								,@JobId

*/


BEGIN

	declare @offset int = @PageIndex * @PageSize 

SELECT app.Id
      ,app.JobId
	  ,job.Title as JobTitle
	  ,job.JobTypeId
	  ,job.JobStatusId
	  ,job.RemoteStatusId
      ,app.ResumeFileId
	  ,fil.Name
	  ,fil.Url
	  ,[FileType] = (
				Select fil.FileTypeId, typ.Name
				from dbo.FileTypes as typ
				Where fil.FileTypeId = typ.Id
				for json auto, without_array_wrapper
	  )
	  ,fil.DateCreated
	  ,fil.FileSize
	  ,fil.Downloaded
      ,app.StatusId
	  ,stat.Name as Status
      ,app.IsWithdrawn
      ,app.CreatedBy
	  ,u.FirstName
	  ,u.LastName
	  ,u.Mi
	  ,u.AvatarUrl
      ,app.DateCreated
      ,app.DateModified
	  ,[totalCount] = Count(1)over()

  FROM [dbo].[JobApplications] as app inner join dbo.ApplicationStatus as stat
			on app.StatusId = stat.Id inner join dbo.Users as u
			on app.CreatedBy = u.Id inner join dbo.Jobs as job
			on app.JobId = job.Id inner join dbo.FilesV2 as fil
			on app.ResumeFileId = fil.Id inner join dbo.FileTypes as typ
			on fil.FileTypeId = typ.Id
	Where app.JobId = @JobId

END
GO
