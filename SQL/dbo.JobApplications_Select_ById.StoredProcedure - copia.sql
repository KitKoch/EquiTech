GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE proc [dbo].[JobApplications_Select_ById]
						@Id int

as


/*

Declare @Id int = 15;

Execute dbo.[JobApplications_Select_ById]
								@Id

*/


BEGIN

SELECT app.Id
      ,app.JobId
	  ,job.Title as JobTitle
	  ,job.JobTypeId
	  ,jt.Name
	  ,job.JobStatusId
	  ,js.Name
	  ,job.RemoteStatusId
	  ,rs.Name
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

  FROM [dbo].[JobApplications] as app inner join dbo.ApplicationStatus as stat
			on app.StatusId = stat.Id inner join dbo.Users as u
			on app.CreatedBy = u.Id inner join dbo.Jobs as job
			on app.JobId = job.Id inner join dbo.FilesV2 as fil
			on app.ResumeFileId = fil.Id inner join dbo.FileTypes as typ
			on fil.FileTypeId = typ.Id inner join dbo.JobStatus as js
			on js.Id = app.StatusId inner join dbo.JobTypes as jt
			on jt.Id = job.JobTypeId inner join dbo.RemoteStatus as rs
			on job.RemoteStatusId = rs.Id
	Where app.Id = @Id

END
GO
