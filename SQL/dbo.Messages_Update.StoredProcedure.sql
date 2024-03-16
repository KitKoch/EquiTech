GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROC [dbo].[Messages_Update]
	@Id INT,
	@Message NVARCHAR(1000),
	@Subject NVARCHAR(100) = null,
	@CurrentUserId int
AS

/*  TEST CODE

	DECLARE @Id INT = 1,
	@Message NVARCHAR(1000) = 'HI',
	@Subject NVARCHAR(100)= 'Greetings'

	EXECUTE  [dbo].[Messages_Update] 
							@Id
							,@Message
							,@Subject
*/

BEGIN

UPDATE [dbo].[Messages]
   SET [Message] = @Message
      ,[Subject] = @Subject
      ,[DateModified] = GETUTCDATE()
   WHERE Id = @Id AND SenderId = @CurrentUserId

END
GO
