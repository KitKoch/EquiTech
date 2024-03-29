GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


 CREATE PROC [dbo].[Blogs_Update]
					@BlogTypeId int
					,@AuthorId int
					,@Title nvarchar(100)
					,@Subject nvarchar(50)
					,@Content nvarchar(4000)
					,@IsPublished bit
					,@ImageUrl nvarchar(255)
					,@DatePublished datetime2
					,@IsDeleted bit
					,@Id int
			

AS
/*---------------- TEST CODE -----------------

DECLARE				@Id int = 6

DECLARE				@BlogTypeId int = 1
					,@AuthorId int = 3
					,@Title nvarchar(100) = 'Blog Title Update2'
					,@Subject nvarchar(50) = 'Blog Subject Update'
					,@Content nvarchar(4000) = 'Blog Content Update'
					,@IsPublished bit = 0
					,@ImageUrl nvarchar(255) = 'www.blogImageUpdate.com'
					,@DatePublished datetime2 = '03/31/2023'
					,@IsDeleted bit = 0
	
EXECUTE dbo.Blogs_SelectById @Id


EXECUTE dbo.Blogs_Update
					@BlogTypeId
					,@AuthorId
					,@Title
					,@Subject
					,@Content
					,@IsPublished 
					,@ImageUrl 
					,@DatePublished
					,@IsDeleted
					,@Id 

EXECUTE dbo.Blogs_SelectById @Id

*/
BEGIN

	DECLARE @DateModified datetime2(7) = GETUTCDATE()
	
	
	UPDATE [dbo].blogs
	
	SET				[BlogTypeId] = @BlogTypeId
					,[AuthorId] = @AuthorId
					,[Title] = @Title
					,[Subject] = @Subject 
					,[Content] = @Content 
					,[IsPublished] = @IsPublished 
					,[ImageUrl] = @ImageUrl 
					,[DateModified] = @DateModified
					,[DatePublished] = @DatePublished 
					,[IsDeleted] = @IsDeleted
	WHERE Id = @Id				


END
GO
