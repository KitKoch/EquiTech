GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


	CREATE PROC [dbo].[NewsletterContent_Update]
										 @TemplateKeyId int
										,@NewsletterId int
										,@Value nvarchar(4000)
										,@Id int 
	as
/*	
		DECLARE @TemplateKeyId int = 1
				,@NewsletterId int = 1
				,@Value nvarchar(4000) = 'I DONT KNOW WHAT TYPE OF DATA GOES IN HERE'
				,@UserId int = 3
				,@Id int = 1

		EXECUTE dbo.NewsletterContent_Update
											@TemplateKeyId 
											,@NewsletterId 
											,@Value 
											,@UserId 
											,@Id 
*/
	BEGIN

			DECLARE @DateNow datetime2 = getutcdate()

			UPDATE [dbo].[NewsletterContent]
			   SET [TemplateKeyId] = @TemplateKeyId
				  ,[NewsletterId] = @NewsletterId
				  ,[Value] = @Value
				  ,[DateModified] = @DateNow
			 WHERE Id = @Id

	END
GO
