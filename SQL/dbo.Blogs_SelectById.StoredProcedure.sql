GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROC [dbo].[Blogs_SelectById]
		@Id int
as

/* ---------------TEST-------------
	Declare @Id int = 5

	 Execute [dbo].[Blogs_SelectById] @Id


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
		where b.Id = @Id



END
GO
