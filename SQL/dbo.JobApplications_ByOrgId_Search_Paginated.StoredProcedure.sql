GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROC [dbo].[JobApplications_ByOrgId_Search_Paginated]
		    @PageIndex int
		   ,@PageSize int
		   ,@OrganizationId int
		   ,@Query nvarchar(50)
		   
AS

/*
	DECLARE  @PageIndex int = 0
			,@PageSize int = 100
			,@OrganizationId int = 2
			,@Query nvarchar(50) = 'Accepted'
			
	EXECUTE dbo.JobApplications_ByOrgId_Search_Paginated @PageIndex, @PageSize, @OrganizationId, @Query
*/

BEGIN

	DECLARE @Offset int = @PageIndex * @PageSize

	SELECT ja.Id AS ApplicationId

		  ,ja.JobId AS JobId
		  ,j.Title AS JobTitle
		  ,j.Description
		  ,j.Requirements

		  ,jt.Id AS JobTypeId
		  ,jt.Name AS JobTypeName

		  ,js.Id AS JobStatusId
		  ,js.Name AS JobStatusName

		  ,rs.Id AS RemoteStatusId
		  ,rs.Name

		  ,o.Id AS OrganizationId
		  ,o.Name AS Company
		  ,o.Headline
		  ,o.Description
		  ,o.Logo
		  ,o.Phone
		  ,o.SiteUrl

		  ,j.ContactName
		  ,j.ContactPhone
		  ,j.ContactEmail

		  ,j.EstimatedStartDate
		  ,j.EstimatedFinishDate
		  ,j.DateCreated
		  ,j.DateModified
		  ,j.CreatedBy
		  ,j.ModifiedBy

		  ,ja.StatusId
		  ,stat.Name AS ApplicationStatus
		  ,ja.IsWithdrawn

		  ,ja.CreatedBy
		  ,u.FirstName
		  ,u.LastName
		  ,u.Mi
		  ,u.AvatarUrl
		  ,u.Email

		  ,ja.DateCreated
		  ,ja.DateModified

		  ,PendingStatusCount = (
			SELECT COUNT(*) 
			FROM dbo.JobApplications AS ja2 
			INNER JOIN dbo.Jobs AS j2 ON j2.id = ja2.JobId 
			INNER JOIN dbo.Organizations AS o2 ON j2.OrganizationId = o2.Id
			WHERE ja2.StatusId = 1 AND o2.id = o.Id
		  )
		  ,AcceptedStatusCount = (
			SELECT COUNT(*) 
			FROM dbo.JobApplications AS ja2 
			INNER JOIN dbo.Jobs AS j2 ON j2.id = ja2.JobId 
			INNER JOIN dbo.Organizations AS o2 ON j2.OrganizationId = o2.Id
			WHERE ja2.StatusId = 2 AND o2.id = o.Id
		  )
		  ,NegotationStatusCount = (
			SELECT COUNT(*) 
			FROM dbo.JobApplications AS ja2 
			INNER JOIN dbo.Jobs AS j2 ON j2.id = ja2.JobId 
			INNER JOIN dbo.Organizations AS o2 ON j2.OrganizationId = o2.Id
			WHERE ja2.StatusId = 3 AND o2.id = o.Id
		  )
		  ,OfferedStatusCount = (
			SELECT COUNT(*) 
			FROM dbo.JobApplications AS ja2 
			INNER JOIN dbo.Jobs AS j2 ON j2.id = ja2.JobId 
			INNER JOIN dbo.Organizations AS o2 ON j2.OrganizationId = o2.Id
			WHERE ja2.StatusId = 4 AND o2.id = o.Id
		  )
		  ,EmployedStatusCount = (
			SELECT COUNT(*) 
			FROM dbo.JobApplications AS ja2 
			INNER JOIN dbo.Jobs AS j2 ON j2.id = ja2.JobId 
			INNER JOIN dbo.Organizations AS o2 ON j2.OrganizationId = o2.Id
			WHERE ja2.StatusId = 6 AND o2.id = o.Id
		  )
		  ,RejectedStatusCount = (
			SELECT COUNT(*) 
			FROM dbo.JobApplications AS ja2 
			INNER JOIN dbo.Jobs AS j2 ON j2.id = ja2.JobId 
			INNER JOIN dbo.Organizations AS o2 ON j2.OrganizationId = o2.Id
			WHERE ja2.StatusId = 7 AND o2.id = o.Id
		  )
		  ,TotalCount = COUNT(1)OVER()

	FROM dbo.Jobs AS j 
	INNER JOIN dbo.JobStatus AS js ON j.JobStatusId = js.Id
	INNER JOIN dbo.JobTypes AS jt ON j.JobTypeId = jt.Id
	INNER JOIN dbo.JobApplications AS ja ON j.Id = ja.JobId
	INNER JOIN dbo.ApplicationStatus AS stat ON ja.StatusId = stat.Id
	INNER JOIN dbo.Organizations AS o ON j.OrganizationId = o.Id
	INNER JOIN dbo.RemoteStatus AS rs ON j.RemoteStatusId = rs.Id
	INNER JOIN dbo.Users AS u ON ja.CreatedBy = u.Id

	WHERE @OrganizationId = o.Id AND (
	   j.Title LIKE '%' + @Query + '%'
	OR j.EstimatedStartDate LIKE '%' + @Query + '%'
	OR j.EstimatedFinishDate LIKE '%' + @Query + '%'
	OR stat.Name LIKE '%' + @Query + '%'
	OR u.FirstName LIKE '%' + @Query + '%'
	OR u.LastName LIKE '%' + @Query + '%'
	OR u.Email LIKE '%' + @Query + '%'
	)
	ORDER BY ja.DateModified DESC
	OFFSET @Offset ROWS
	FETCH NEXT @PageSize ROWS ONLY

END
GO
