GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROC [dbo].[Messages_Select_ById]
	@Id int
AS

/*  TEST CODE

	declare @Id int = 1
	EXECUTE [dbo].[Messages_Select_ById] @Id

*/

BEGIN


SELECT [Id]
      ,[Message]
      ,[Subject]
      ,[RecipientId]
      ,[SenderId]
      ,[DateSent]
      ,[DateRead]
      ,[DateModified]
      ,[DateCreated]
  FROM [dbo].[Messages]
  WHERE Id = @Id


END
GO
