GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


 CREATE PROC [dbo].[Blogs_Insert]
					@BlogTypeId int
					,@AuthorId int
					,@Title nvarchar(100)
					,@Subject nvarchar(50)
					,@Content nvarchar(4000)
					,@IsPublished bit
					,@ImageUrl nvarchar(255)
					,@DatePublished datetime2
					,@IsDeleted bit

					,@Id int OUTPUT
			

AS
/*---------------- TEST CODE -----------------

DECLARE				@Id int = 0;

DECLARE				@BlogTypeId int = 1
					,@AuthorId int = 3
					,@Title nvarchar(100) = 'Blog Title'
					,@Subject nvarchar(50) = 'Blog Subject'
					,@Content nvarchar(4000) = 'Blog Content'
					,@IsPublished bit = 0
					,@ImageUrl nvarchar(255) = 'www.blogImage.com'
					,@DatePublished datetime2 = '03/31/2023'
					,@IsDeleted bit = 0
	


EXECUTE dbo.Blogs_Insert
					@BlogTypeId
					,@AuthorId
					,@Title
					,@Subject
					,@Content
					,@IsPublished 
					,@ImageUrl 
					,@DatePublished
					,@IsDeleted
					
					,@Id OUTPUT

EXECUTE dbo.Blogs_SelectById @Id


*/
BEGIN

	INSERT INTO [dbo].blogs
					([BlogTypeId]
					,[AuthorId]
					,[Title]
					,[Subject] 
					,[Content] 
					,[IsPublished] 
					,[ImageUrl] 
					,[DatePublished] 
					,[IsDeleted])
     VALUES
					(@BlogTypeId
					,@AuthorId
					,@Title
					,@Subject 
					,@Content 
					,@IsPublished 
					,@ImageUrl 
					,@DatePublished 
					,@IsDeleted)
	SET				
					@Id = SCOPE_IDENTITY()

END
GO
