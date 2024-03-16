GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

	CREATE PROC [dbo].[NewsletterTemplates_Insert]
											 @Name nvarchar(100)
											,@Description nvarchar(200)
											,@PrimaryImage nvarchar(255)
											,@UserId int
											,@Id int OUTPUT

	as
/*
		DECLARE  @Name nvarchar(100) = 'Template A'
				,@Description nvarchar(200) = 'This is a template for A uses'
				,@PrimaryImage nvarchar(255) = 'https://trello.com/1/cards/641b24d75411bef296431875/attachments/641b24df5411bef29643365e/previews/641b24df5411bef296433664/download/image.png'
				,@UserId int = 3
				,@Id int

		EXECUTE NewsletterTemplates_Insert
										 @Name 
										,@Description 
										,@PrimaryImage 
										,@UserId
										,@Id output

		DECLARE  @PageIndex int = 0
				,@PageSize int = 10

		EXECUTE dbo.NewsletterTemplates_SelectAll
											 @PageIndex
											,@PageSize
*/
	BEGIN


			INSERT INTO [dbo].[NewsletterTemplates]
					   ([Name]
					   ,[Description]
					   ,[PrimaryImage]
					   ,[CreatedBy])
				 VALUES
					   (@Name
					   ,@Description 
					   ,@PrimaryImage
					   ,@UserId)

				SET @Id = SCOPE_IDENTITY()

	END


GO
