GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
 
 CREATE PROC [dbo].[Users_Search_Filter_Status_Paginated]
				@Query nvarchar(50)
				,@StatusId int
				,@PageIndex int
				,@PageSize int
AS
/*---------------- TEST CODE -----------------

	DECLARE		@Query nvarchar(50) = 'Kolby'
				,@StatusId int = '1'
				,@PageIndex int = '0'
				,@PageSize int = '10'

	EXECUTE [dbo].[Users_Search_Filter_Status_Paginated]
				@Query
				,@StatusId
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

	WHERE		(u.FirstName LIKE '%' + @Query + '%'
				OR u.LastName LIKE '%' + @Query + '%')
				AND u.StatusId = @StatusId

	ORDER BY	[Id]

	OFFSET @offset ROWS
	FETCH NEXT @PageSize ROWS ONLY

 END

GO
