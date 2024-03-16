GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

	CREATE PROC [dbo].[Newsletters_Insert_V2]
									 @TemplateId int
									,@CategoryId int
									,@Description nvarchar(255)
									,@Name nvarchar(100)
									,@CoverPhoto nvarchar(255)
									,@IsSubscribed bit
									,@DateToPublish datetime2 = NULL
									,@DateToExpire datetime2 = NULL
									,@UserId int
									,@BatchContents dbo.BatchContents READONLY
									,@Id int OUTPUT
	as
/*	
		DECLARE @TemplateId int = 1
				,@CategoryId int = 1
				,@Description nvarchar(255) = 'THIS IS A DESCTIPRION'
				,@Name nvarchar(100) = 'Newsletter 1'
				,@CoverPhoto nvarchar(255) = 'coverphoto.com'
				,@IsSubscribed bit = 1
				,@DateToPublish datetime2
				,@DateToExpire datetime2
				,@UserId int = 3
				,@Values dbo.BatchContents
				,@Id int

		INSERT INTO @Values
						( TemplateKeyId,
						  [Value] )
			Values( 1, 'This is a Test' ), ( 2, 'This is another Test' ), (4, 'AND YET ANOTHER' ), ( 5, 'https://trello.com/1/cards/641b24d75411bef296431811/attachments/641b24df5411bef296433654/previews/641b24df5411bef29643365c/download/Newsletters.png' )

		EXECUTE dbo.Newsletters_Insert_V2
									 @TemplateId
									,@CategoryId
									,@Description
									,@Name
									,@CoverPhoto
									,@IsSubscribed
									,@DateToPublish
									,@DateToExpire
									,@UserId 	
									,@Values
									,@Id OUTPUT

		EXECUTE dbo.Newsletters_Select_ByCategoryId_V2
													 @CategoryId 
*/
	BEGIN
	
				INSERT INTO [dbo].[Newsletters]
						   ([TemplateId]
						   ,[CategoryId]
						   ,[Description]
						   ,[Name]
						   ,[CoverPhoto]
						   ,[isSubscribed]
						   ,[DateToPublish]
						   ,[DateToExpire]
						   ,[CreatedBy])
					 VALUES
						   (@TemplateId
						   ,@CategoryId
						   ,@Description
						   ,@Name
						   ,@CoverPhoto
						   ,@IsSubscribed
						   ,@DateToPublish
						   ,@DateToExpire
						   ,@UserId)

				SET @Id = SCOPE_IDENTITY()

				INSERT INTO [dbo].[NewsletterContent]
						   ([TemplateKeyId]
						   ,[NewsletterId]
						   ,[Value]
						   ,[CreatedBy])
					 SELECT
						    v.TemplateKeyId
						   ,@Id
						   ,v.[Value]
						   ,@UserId
					FROM @BatchContents as v

	END
GO
