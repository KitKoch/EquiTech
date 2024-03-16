GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[Venues_Select_ByCreatedBy]
					@PageIndex int
					,@PageSize int
					,@CreatedBy int

/* -----TEST CODE-----

DECLARE
		@PageIndex int = 0
		,@PageSize int = 5
		,@CreatedBy int = 2
DECLARE @Offset int = @PageIndex * @PageSize

EXECUTE dbo.Venues_Select_ByCreatedBy

		@PageIndex
		,@PageSize
		,@CreatedBy

*/ -----TEST CODE-----

AS

BEGIN

	DECLARE @Offset int = @PageIndex * @PageSize

	SELECT
		v.Id
		,v.[Name]
		,v.[Description]
		,v.LocationId
		,v.[Url]
		,v.CreatedBy
		,v.ModifiedBy
		--,v.DateCreated
		--,v.DateModified
		,TotalCount = COUNT(1) OVER()

	FROM dbo.Venues v join dbo.Locations l
	ON v.LocationId = l.Id
	WHERE v.CreatedBy = @CreatedBy

	ORDER BY v.Id
	OFFSET @offset ROWS
	FETCH NEXT @PageSize ROWS ONLY

END
GO
