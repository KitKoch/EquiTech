GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[Threads_Insert]
		   @Subject NVARCHAR(255) = NULL
		  ,@Content NVARCHAR(MAX)
		  ,@ForumId INT
		  ,@ParentId INT = NULL
		  ,@CreatedBy INT
		  ,@Id INT OUTPUT
AS
/*
Declare @Id INT 
DECLARE @Subject NVARCHAR(255) = 'This is the parent thread with no replies',
        @Content NVARCHAR(MAX) = 'This is the content of the thread.',
		@ForumId INT = 24,
        @ParentId INT = 0,
        @CreatedBy INT = 3

EXECUTE [dbo].[Threads_Insert]
		   @Subject
		  ,@Content
		  ,@ForumId
		  ,@ParentId
		  ,@CreatedBy
		  ,@Id OUTPUT

SELECT *
FROM [dbo].[Threads]
*/
BEGIN

  INSERT INTO [dbo].[Threads] ( [Subject]
								,Content
								,ForumId
								,ParentId
								,IsDeleted
								,CreatedBy
								,DateCreated
								,DateModified)

						  VALUES (@Subject
								,@Content
								,@ForumId
								,@ParentId
								,0
								,@CreatedBy
								,GETUTCDATE()
								,GETUTCDATE())

	SET @Id = SCOPE_IDENTITY()
END
GO
