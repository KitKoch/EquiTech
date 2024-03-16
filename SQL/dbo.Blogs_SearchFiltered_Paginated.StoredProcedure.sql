GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROC [dbo].[Blogs_SearchFiltered_Paginated]
		@PageIndex int,
		@PageSize int,
		@Query nvarchar(100),
		@BlogType int = Null,
		@StartDate datetime2(7) = Null,
		@EndDate datetime2(7) = Null

as

/* ---------------TEST-------------
	Declare @PageIndex int = 0
			,@PageSize int = 20
			,@Query nvarchar(100) = ''
			,@BlogType int = Null
			,@StartDate datetime2(7) = '2023/04/23'
			,@EndDate datetime2(7) = '2023/05/02'

	 Execute [dbo].[Blogs_SearchFiltered_Paginated] 
			@PageIndex
			, @PageSize
			, @Query
			, @BlogType
			,@StartDate
			,@EndDate

*/

BEGIN

	declare @offset int = @PageIndex * @PageSize 

SELECT	b.[Id]
		,b.[BlogTypeId]
		,bt.[Name] as BlogCataegory
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
		,[totalCount] = Count(1)over()


		FROM [dbo].[Blogs] as b inner join dbo.Users as u
		on b.AuthorId = u.Id
		inner join dbo.BlogTypes as bt
		on b.BlogTypeId = bt.Id

		Where	(b.[Title] LIKE '%' + @Query + '%' OR 
				b.[Subject] LIKE '%' + @Query + '%' OR
				b.[Content] LIKE '%' + @Query + '%') AND
				(@BlogType IS NULL OR b.BlogTypeId = @BlogType ) AND
				(@StartDate IS NULL OR @EndDate IS NULL OR b.DateCreated BETWEEN @StartDate AND @EndDate)

		order by b.Id
		offset @offset rows
		fetch next @PageSize rows only


END
GO
