GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

		CREATE PROC [dbo].[NewsletterTemplates_Update]
											 @Name nvarchar(100)
											,@Description nvarchar(200)
											,@PrimaryImage nvarchar(255)
											,@Id int
	as	
/*

		DECLARE  @Name nvarchar(100) = 'Template B'
				,@Description nvarchar(200) = 'This is a template for B uses'
				,@PrimaryImage nvarchar(255) = 'https://trello.com/1/cards/641b24d75411bef296431875/attachments/641b24df5411bef29643365e/previews/641b24df5411bef296433664/download/image.png'
				,@Id int = 1

		EXECUTE dbo.NewsletterTemplates_Update
										 @Name 
										,@Description 
										,@PrimaryImage
										,@Id 

		DECLARE  @PageIndex int = 0
				,@PageSize int = 10

		EXECUTE dbo.NewsletterTemplates_SelectAll
											 @PageIndex
											,@PageSize
*/
	BEGIN
			
			DECLARE @DateNow datetime2 = GETUTCDATE()

			UPDATE [dbo].[NewsletterTemplates]
			   SET [Name] = @Name
				  ,[Description] = @Description
				  ,[PrimaryImage] = @PrimaryImage
				  ,[DateModified] = @DateNow
			 WHERE Id = @Id

	END	


GO
