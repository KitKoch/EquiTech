GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


 CREATE PROC [dbo].[Blogs_Select_BlogType]
		@BlogType int
as

/* ---------------TEST-------------
	Declare @BlogType int = 1

	 Execute [dbo].[Blogs_Select_BlogType] @BlogType


*/

BEGIN



SELECT	b.[Id]
		,b.[BlogTypeId]
		,bt.[Name] as BlogType
		,b.[AuthorId]
		,u.[FirstName]
		,u.[LastName]
		,u.[AvatarUrl] as Avatar
		,b.[Title]
		,b.[Subject] 
		,b.[Content]
		,b.[IsPublished]
		,b.[ImageUrl]
		,b.[DateCreated]
		,b.[DateModified]
		,b.[DatePublished]
		,b.[IsDeleted]


		FROM [dbo].[Blogs] as b inner join dbo.Users as u
		on b.AuthorId = u.Id
		inner join dbo.BlogTypes as bt
		on b.BlogTypeId = bt.Id
		where b.BlogTypeId = @BlogType



END
GO
