GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
	
	CREATE PROC [dbo].[NewsletterTemplates_Delete]
											@Id int
	as	
/*
		DECLARE  @PageIndex int = 0
				,@PageSize int = 10
				,@Id int = 3

		EXECUTE dbo.NewsletterTemplates_SelectAll
											 @PageIndex
											,@PageSize

		EXECUTE dbo.NewsletterTemplates_Delete 
											@Id

		EXECUTE dbo.NewsletterTemplates_SelectAll
											 @PageIndex
											,@PageSize
*/
	BEGIN
 
			DELETE FROM [dbo].[NewsletterTemplates]
				  WHERE Id = @Id

	END
GO
