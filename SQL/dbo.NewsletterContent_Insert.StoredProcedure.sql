GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

	CREATE PROC [dbo].[NewsletterContent_Insert]
										 @TemplateKeyId int
										,@NewsletterId int
										,@Value nvarchar(4000)
										,@UserId int
										,@Id int OUTPUT
	as
/*	
		DECLARE @TemplateKeyId int = 1
				,@NewsletterId int = 1
				,@Value nvarchar(4000) = 'I DONT KNOW WHAT TYPE OF DATA GOES IN HERE'
				,@UserId int = 3
				,@Id int 

		EXECUTE dbo.NewsletterContent_Insert
											@TemplateKeyId 
											,@NewsletterId 
											,@Value 
											,@UserId 
											,@Id  OUTPUT
*/
	BEGIN

			INSERT INTO [dbo].[NewsletterContent]
					   ([TemplateKeyId]
					   ,[NewsletterId]
					   ,[Value]
					   ,[CreatedBy])
				 VALUES
					   (@TemplateKeyId
					   ,@NewsletterId
					   ,@Value
					   ,@UserId)

		SET @Id = SCOPE_IDENTITY()

	END


GO
