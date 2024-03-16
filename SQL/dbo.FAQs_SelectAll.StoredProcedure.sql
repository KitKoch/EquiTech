GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[FAQs_SelectAll]

AS

/*

EXECUTE [dbo].[FAQs_SelectAll]

*/

BEGIN

SELECT f.[Id]
      ,f.[Questions]
      ,f.[Answer]
      ,fc.[Id] as CategoryId
	  ,fc.[Name] as Category
      ,f.[SortOrder]
      ,f.[DateCreated]
      ,f.[DateModified]
	  ,f.[ModifiedBy]

  FROM [dbo].[FAQs] AS f
  INNER JOIN dbo.FAQCategories AS fc
  ON f.[CategoryId] = fc.[Id]	
  INNER JOIN dbo.Users AS u
  ON f.[ModifiedBy] = u.[Id]

  ORDER BY f.[SortOrder] ASC



END


GO
