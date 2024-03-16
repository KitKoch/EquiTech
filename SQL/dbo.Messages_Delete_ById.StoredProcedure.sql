USE [Fairly]
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[Messages_Delete_ById]
	@Id int
AS

/*  TEST CODE

	declare @Id int = 1
	EXECUTE [dbo].[Messages_DeleteById] @Id

	SELECT * FROM dbo.Messages

*/

BEGIN


DELETE FROM [dbo].[Messages]
      WHERE Id = @Id


END
GO
