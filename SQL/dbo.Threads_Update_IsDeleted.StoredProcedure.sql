GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[Threads_Update_IsDeleted]
	@Id INT
AS
/*
DECLARE @Id INT = 12

EXEC [dbo].[Threads_Update_IsDeleted] @Id
SELECT * 
FROM [dbo].[Threads]
*/
BEGIN
	UPDATE [dbo].[Threads]
	SET [IsDeleted] = 1,
		[DateModified] = GETUTCDATE()
	WHERE [Id] = @Id;
END
GO
