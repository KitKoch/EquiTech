GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[Forums_SearchPaginated]
    @Query nvarchar(100)
    ,@PageIndex int
    ,@PageSize int
AS
/*
DECLARE @Query nvarchar(100) = 'Cat A'
		 ,@PageIndex int = 0
		 ,@PageSize int = 10

EXECUTE [dbo].[Forums_SearchPaginated] 
		 @Query
		,@PageIndex
		,@PageSize

	SELECT *
	FROM dbo.Forums

	SELECT * 
	FROM dbo.ForumCategories
*/
BEGIN
    DECLARE @Offset int = @PageIndex * @PageSize

    SELECT FT.[Name]
        ,FT.[Description]
        ,FT.ForumCategoryId
        ,FC.[Name] AS ForumCategoryName
        ,FT.IsPrivate
        ,FT.IsClosed
        ,FT.DateCreated
        ,FT.DateModified
		,TotalCount = COUNT(*)OVER()
    FROM dbo.Forums as FT
    JOIN ForumCategories as FC ON FT.ForumCategoryId = FC.Id
    WHERE (FT.[Name] LIKE '%' + @Query + '%'
        OR FT.[Description] LIKE '%' + @Query + '%'
        OR FC.[Name] LIKE '%' + @Query + '%')
        AND FT.IsPrivate = 0
        AND FT.IsClosed = 0
    ORDER BY FT.DateCreated DESC
    OFFSET @Offset ROWS
    FETCH NEXT @PageSize ROWS ONLY
END
GO
