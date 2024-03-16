GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[NewsletterCategories_SelectAll]

AS

/*

EXECUTE dbo.NewsletterCategories_SelectAll

*/

BEGIN 

	SELECT [Id]
		   ,[Name]
	FROM [dbo].[NewsletterCategories] 

END
GO
