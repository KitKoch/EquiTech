GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[FAQs_Select_ByCategoryId]
			@Id int

AS

/*

DECLARE @Id int = 2

EXECUTE dbo.FAQs_Select_ByCategoryId @Id

*/

BEGIN

SELECT  f.[Id]
      ,f.[Questions]
      ,f.[Answer]
      ,fc.[Id] as CategoryId
	  ,fc.[Name] as Category
      ,f.[SortOrder]
      ,f.[DateCreated]
      ,f.[DateModified]
  FROM [dbo].[FAQs] as f
  INNER JOIN dbo.FAQCategories as fc
  on f.[CategoryId] = fc.[Id]
  Where f.CategoryId = @Id

  ORDER BY f.[SortOrder] ASC


END


GO
