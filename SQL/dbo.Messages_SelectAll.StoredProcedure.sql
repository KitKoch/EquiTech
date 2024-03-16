GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROC [dbo].[Messages_SelectAll]
	@PageIndex INT,
	@PageSize INT
AS

/*  TEST CODE

	EXECUTE [dbo].[dbo].[Messages_SelectAll] 

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
  
  ORDER BY DateCreated

  OFFSET @offSet ROWS
  FETCH NEXT @PageSize ROWS ONLY


END
GO
