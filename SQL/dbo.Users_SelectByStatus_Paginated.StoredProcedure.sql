GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

 CREATE PROC [dbo].[Users_SelectByStatus_Paginated]
				@StatusId int
				,@PageIndex int
				,@PageSize int
AS
/*---------------- TEST CODE -----------------

	DECLARE		@StatusId int = '1'
				,@PageIndex int = '0'
				,@PageSize int = '10'

	EXECUTE dbo.Users_SelectByStatus_Paginated
				@StatusId
				,@PageIndex
				,@PageSize

*/
BEGIN

	DECLARE @offset int = @PageIndex * @PageSize

	SELECT		u.Id
				,u.FirstName
				,u.LastName
				,u.Mi
				,u.AvatarUrl
				,u.Email
				,u.IsConfirmed
				,u.StatusId
				,st.Name
				,u.DateCreated
				,u.DateModified
				,u.IsProfileViewable
				,TotalCount = COUNT(1) OVER()

	FROM		[dbo].[Users] AS u
				INNER JOIN [dbo].[StatusTypes] AS st
					ON u.StatusId = st.Id

	WHERE		@StatusId = u.StatusId

	ORDER BY	[Id]

	OFFSET @offset ROWS
	FETCH NEXT @PageSize ROWS ONLY

 END

GO
