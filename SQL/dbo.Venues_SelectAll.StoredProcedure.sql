GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[Venues_SelectAll]
					@PageIndex int
					,@PageSize int

AS

/* -----TEST CODE-----

DECLARE	
	@PageIndex int = 0
	,@PageSize int = 10
DECLARE @offset int = @PageIndex *@PageSize

EXECUTE dbo.Venues_SelectAll
	@PageIndex
	,@PageSize

*/-----TEST CODE-----


BEGIN 
	DECLARE @offset int = @PageIndex *@PageSize

	SELECT
		v.Id
		,v.[Name]
		,v.[Description]
		,v.LocationId
			--,l.Id
			--,l.LineOne
			--,l.LineTwo
			--,l.City
			--,l.Zip
			--,l.StateId
			--,l.Latitude
			--,l.Longitude
			--,l.DateCreated
			--,l.DateModified
		,v.[Url]
		,v.CreatedBy
		--,v.DateCreated
		--,v.DateModified
		,v.ModifiedBy
		,TotalCount = COUNT(*) OVER()

	FROM dbo.Venues v join dbo.Locations l
	ON v.LocationId = l.Id

	ORDER BY v.Id

	OFFSET @offset ROWS
	FETCH NEXT @PageSize ROWS ONLY

END

GO
