GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[Forum_Categories_SelectAll]
AS
/*
EXECUTE [dbo].[Forum_Categories_SelectAll]
*/
BEGIN
    SELECT Id
		,[Name]
    FROM [dbo].[ForumCategories]
END
GO
