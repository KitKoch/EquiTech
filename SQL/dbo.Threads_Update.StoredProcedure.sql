GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[Threads_Update]
					 @Id INT 
					,@Subject NVARCHAR(255)
					,@Content NVARCHAR(MAX)
					,@ForumId INT 
					,@ParentId INT
					,@CreatedBy INT 

AS
/*
DECLARE @Id INT = 4
		,@Subject NVARCHAR(255) = 'Updated Subject'
		,@Content NVARCHAR(MAX) = 'Updated Content of the thread.'
		,@ForumId INT = 24
		,@ParentId INT = NULL
		,@CreatedBy INT = 3

EXEC [dbo].[Threads_Update]
	 	 @Id
		,@Subject
		,@Content
		,@ForumId
		,@ParentId
		,@CreatedBy

SELECT *
FROM dbo.Threads

*/
BEGIN
	UPDATE [dbo].[Threads]
	 SET [Subject] = @Subject
		,[Content] = @Content 
		,[ForumId] = @ForumId
		,[ParentId] = @ParentId
		,[CreatedBy] = @CreatedBy
		,[DateModified] = GETUTCDATE()
	WHERE [Id] = @Id
	AND [CreatedBy] = @CreatedBy --only the thread created by the specified user is updated, prevents unauthorized updates to other threads
		
END
GO
