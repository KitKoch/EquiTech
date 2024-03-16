GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[Teams_SelectByOrgIdV2]
		@OrganizationId int,
		@PageIndex int,
		@PageSize int
as

/* ---------------TEST-------------
	 
	DECLARE @OrganizationId int = 3,
			@PageIndex int = 0,
			@PageSize int = 100

	EXECUTE [dbo].[Teams_SelectByOrgIdV2]
		@OrganizationId,
		@PageIndex,
		@PageSize

*/

BEGIN

DECLARE @Offset int = @PageIndex * @PageSize

		SELECT
		t.[Id]
		,OrganizationId
		,o.[Name] as OrgName
		,o.Logo as OrgLogo
		,t.[Name] as TeamName
		,t.[Description]
		,t.[DateCreated]
		,t.[DateModified]
		,TeamMembers = 
			(
			SELECT
				u.[id]	as userId
				,u.[email]
				,u.FirstName 
				,u.Mi  
				,u.LastName
				,u.AvatarUrl

			FROM dbo.Users as u 
			INNER JOIN dbo.TeamMembers as tm 
					on u.Id = tm.UserId
			WHERE tm.TeamId = t.Id
			FOR JSON AUTO
			)
		,TotalCount = COUNT(1) OVER()				



	FROM [dbo].[Teams] as t
	inner join dbo.Organizations as o on o.Id = t.OrganizationId
	Where OrganizationId = @OrganizationId

	ORDER BY t.OrganizationId
	OFFSET @OffSet ROWS
	FETCH NEXT @PageSize ROWS ONLY




END
GO
