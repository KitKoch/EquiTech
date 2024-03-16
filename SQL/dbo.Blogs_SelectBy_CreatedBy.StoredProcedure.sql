GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[Blogs_SelectBy_CreatedBy]
		@PageIndex int,
		@PageSize int,
		@AuthorId int
as

/* ---------------TEST-------------
	Declare @PageIndex int = 0
			,@PageSize int = 5
			,@AuthorId int = 3

	 Execute [dbo].[Blogs_SelectBy_CreatedBy] @PageIndex, @PageSize, @AuthorId

*/

BEGIN

	declare @offset int = @PageIndex * @PageSize 

SELECT	b.[Id]
		,b.[BlogTypeId]
		,bt.[Name] as BlogCategory
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
		where b.AuthorId = @AuthorId
		order by b.AuthorId
		offset @offset rows
		fetch next @PageSize rows only


END
GO
