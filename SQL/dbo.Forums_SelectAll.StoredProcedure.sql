GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[Forums_SelectAll]
					@PageIndex int
					,@PageSize int
AS
/*
DECLARE  @PageIndex int = 0
		,@PageSize int = 10
execute [dbo].[Forums_SelectAll] 
				@PageIndex
				,@PageSize

SELECT *
FROM dbo.Forums

SELECT * 
FROM dbo.ForumCategories
*/
BEGIN
    DECLARE @Offset int = @PageIndex * @PageSize

    SELECT FT.Id, 
		FT.[Name],
        FT.[Description],
        FT.ForumCategoryId,
        FC.[Name] AS ForumCategoryName,
        FT.IsPrivate,
        FT.IsClosed,
        FT.DateCreated,
        FT.DateModified,
		TotalCount = COUNT(*)OVER()
    FROM Forums FT
    JOIN ForumCategories FC ON FT.ForumCategoryId = FC.Id
    WHERE FT.IsPrivate = 0
        AND FT.IsClosed = 0
    ORDER BY FT.DateCreated DESC
    OFFSET @PageIndex * @PageSize ROWS
    FETCH NEXT @PageSize ROWS ONLY
END
GO
