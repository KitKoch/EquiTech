GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROC [dbo].[Messages_Select_ByRecipientId]
	@RecipientId INT,
	@PageIndex INT,
	@PageSize INT
AS

/*  TEST CODE

	DECLARE @RecipientId int = 1
	EXECUTE [dbo].[Messages_Select_ByRecipientId] @RecipientId

*/

BEGIN

DECLARE @offset INT = @PageIndex * @PageSize

SELECT [Id]
      ,[Message]
      ,[Subject]
      ,[RecipientId]
      ,[SenderId]
      ,[DateSent]
      ,[DateRead]
      ,[DateModified]
      ,[DateCreated]
	  ,TotalCount = COUNT (*) OVER ()
  FROM [dbo].[Messages]
  WHERE RecipientId = @RecipientId 
  
  ORDER BY DateCreated

  OFFSET @offSet ROWS
  FETCH NEXT @PageSize ROWS ONLY


END
GO
