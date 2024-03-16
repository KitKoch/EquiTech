GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROC [dbo].[Blogs_SelectAllByLatestDate_Paginated]
		@PageIndex int,
		@PageSize int

AS

/* ---------------TEST-------------
	Declare @PageIndex int = 0
			,@PageSize int = 10

	 Execute [dbo].[Blogs_SelectAllByLatestDate_Paginated] @PageIndex, @PageSize

*/

BEGIN

	DECLARE @offset int = @PageIndex * @PageSize 

    SELECT	 b.[Id]
			,b.[BlogTypeId]
			,bt.[Name] AS BlogCataegory
			,b.[AuthorId]
			,u.[FirstName]
			,u.[LastName]
			,u.[AvatarUrl]
			,b.[Title]
			,b.[Subject] 
			,b.[Content] 
			,b.[IsPublished] 
			,b.[ImageUrl] 
			,b.[DateCreated]
			,b.[DateModified]
			,b.[DatePublished] 
			,b.[IsDeleted]
			,[totalCount] = COUNT(1)OVER()

		FROM [dbo].[Blogs] AS b 
		INNER JOIN dbo.Users AS u
		ON b.AuthorId = u.Id
		INNER JOIN dbo.BlogTypes AS bt
		ON b.BlogTypeId = bt.Id

		ORDER BY b.DateModified DESC
		OFFSET @offset ROWS
		FETCH NEXT @PageSize ROWS only

END
GO
