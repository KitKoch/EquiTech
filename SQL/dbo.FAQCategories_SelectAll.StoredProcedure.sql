GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[FAQCategories_SelectAll]

as

/*

Execute dbo.FAQCategories_SelectAll

*/

BEGIN

SELECT [Id]
      ,[Name]
  FROM [dbo].[FAQCategories]

END




GO
