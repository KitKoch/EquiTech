GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

	CREATE PROC [dbo].[Newsletters_Update]
									 @TemplateId int
									,@CategoryId int
									,@Description nvarchar(255)
									,@Name nvarchar(100)
									,@CoverPhoto nvarchar(255)
									,@IsSubscribed bit
									,@DateToPublish datetime2 = NULL
									,@DateToExpire datetime2 = NULL							
									,@Id int 
	as
/*	
		DECLARE @TemplateId int = 1
				,@CategoryId int = 1
				,@Description nvarchar(255) = 'THIS IS AN UPDATED DESCTIPRION'
				,@Name nvarchar(100) = 'Newsletter 1'
				,@CoverPhoto nvarchar(255) = 'coverphoto.com'
				,@IsSubscribed bit = 1
				,@DateToPublish datetime2 = GETUTCDATE()
				,@DateToExpire datetime2 = GETUTCDATE()					
				,@Id int = 1
				,@PageIndex int = 0
				,@PageSize int = 5	

		EXECUTE dbo.Newsletters_SelectAll
									 @PageIndex 	
									,@PageSize 	

		EXECUTE dbo.Newsletters_Update
									 @TemplateId
									,@CategoryId
									,@Description
									,@Name
									,@CoverPhoto
									,@IsSubscribed
									,@DateToPublish
									,@DateToExpire								
									,@Id 

		EXECUTE dbo.Newsletters_SelectAll
									 @PageIndex 	
									,@PageSize 	
*/
	BEGIN

			DECLARE @DateNow datetime2 = GETUTCDATE()
	
			UPDATE [dbo].[Newsletters]
			   SET [TemplateId] = @TemplateId
				  ,[CategoryId] = @CategoryId
				  ,[Description] = @Description
				  ,[Name] = @Name
				  ,[CoverPhoto] = @CoverPhoto
				  ,[isSubscribed] = @IsSubscribed
				  ,[DateToPublish] = @DateToPublish
				  ,[DateToExpire] = @DateToExpire
				  ,[DateModified] = @DateNow
			 WHERE Id = @Id

	END	
GO
