GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[Venues_Search]
					@PageIndex int
					,@PageSize int
					,@Query nvarchar(50)

AS

/* -----TEST CODE-----

DECLARE	
	@PageIndex int = 0
	,@PageSize int = 10
	,@Query nvarchar(50) = 'Altura'

EXECUTE dbo.Venues_Search
	@PageIndex
	,@PageSize
	,@Query

*/-----TEST CODE-----

BEGIN 
	DECLARE @offset int = @PageIndex *@PageSize

		SELECT
		v.Id
		,v.[Name]
		,v.[Description]
			,l.Id
			,l.LineOne
			,l.LineTwo
			,l.City
			,l.Zip
			,l.StateId
			,s.Code
			,s.[Name]
		,v.[Url]
			,u.Id
			,u.FirstName
			,u.LastName
			,u.Mi
			,u.AvatarUrl
			,mu.Id
			,mu.FirstName
			,mu.LastName
			,mu.Mi
			,mu.AvatarUrl
		,TotalCount = COUNT(1) OVER()

	FROM dbo.Venues v 
		join dbo.Locations l ON v.LocationId = l.Id
		join dbo.Users u ON l.CreatedBy = u.Id
		join dbo.Users mu ON l.ModifiedBy = mu.Id
		join dbo.States s ON l.StateId = s.Id

	WHERE    v.Name LIKE '%' + @Query + '%'
	      OR v.Description LIKE '%' + @Query + '%'
		  OR l.LineOne LIKE '%' + @Query + '%'
		  OR l.LineTwo LIKE '%' + @Query + '%'
		  OR l.City LIKE '%' + @Query + '%'
		  OR l.Zip  LIKE '%' + @Query + '%'
		  OR s.Name LIKE '%' + @Query + '%'
		  OR u.FirstName LIKE '%' + @Query + '%'
		  OR u.LastName LIKE '%' + @Query + '%'
		  OR mu.FirstName LIKE '%' + @Query + '%'
		  OR mu.LastName LIKE '%' + @Query + '%'

	ORDER BY v.Id

	OFFSET @offset ROWS
	FETCH NEXT @PageSize ROWS ONLY

END

GO
