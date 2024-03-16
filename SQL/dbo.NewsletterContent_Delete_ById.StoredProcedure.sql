USE [Fairly]
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


	CREATE PROC [dbo].[NewsletterContent_Delete_ById]
											@Id int 
	as
/*	
			DECLARE @Id int = 1

	 		EXECUTE dbo.NewsletterContent_Delete_ById
												@Id
*/
	BEGIN

		DELETE FROM [dbo].[NewsletterContent]
			  WHERE Id = @Id

	END	
GO
