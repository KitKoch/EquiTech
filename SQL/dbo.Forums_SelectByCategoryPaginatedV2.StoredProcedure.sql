GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE Proc [dbo].[Forums_SelectByCategoryPaginatedV2]
	@ForumCategoryId int,
	@PageIndex int,
	@PageSize int

AS

/*------------ TESTING CODE ------------

EXECUTE [dbo].[Forums_SelectByCategoryPaginatedV2] 1, 0, 5
															
*/

BEGIN

    DECLARE @Offset int = @PageIndex * @PageSize

    SELECT FT.Id
		,FT.[Name]
        ,FT.[Description]
        ,FT.ForumCategoryId
        ,FC.[Name] AS ForumCategoryName
        ,FT.IsPrivate
        ,FT.IsClosed
        ,FT.DateCreated
        ,FT.DateModified
		,TotalCount = COUNT(*)OVER()
    FROM dbo.Forums as FT
    INNER JOIN ForumCategories FC ON FT.ForumCategoryId = FC.Id
    WHERE FC.Id = @ForumCategoryId
        AND FT.IsPrivate = 0
        AND FT.IsClosed = 0
    ORDER BY FT.DateCreated DESC

    OFFSET @PageIndex * @PageSize ROWS
    FETCH NEXT @PageSize ROWS ONLY
    
END
GO
