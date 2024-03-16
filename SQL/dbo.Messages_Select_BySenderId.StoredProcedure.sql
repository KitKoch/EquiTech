GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROC [dbo].[Messages_Select_BySenderId]
	@SenderId INT,
	@PageIndex INT,
	@PageSize INT
AS

/*  TEST CODE

	declare @SenderId int = 1
	EXECUTE [dbo].[Messages_Select_BySenderId] @SenderId

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
  WHERE SenderId = @SenderId 
  
  ORDER BY DateCreated

  OFFSET @offSet ROWS
  FETCH NEXT @PageSize ROWS ONLY


END
GO
