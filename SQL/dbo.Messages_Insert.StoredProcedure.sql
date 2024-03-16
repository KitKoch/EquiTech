USE [Fairly]
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[Messages_Insert]
	@Message NVARCHAR(1000),
	@Subject NVARCHAR(100) = null,
	@RecipientId INT,
	@SenderId INT,
	@Id INT OUTPUT
AS

/*  TEST CODE

	DECLARE 
	@Message NVARCHAR(1000) = 'HI',
	@Subject NVARCHAR(100)= 'Greetings',
	@RecipientId INT = 1,
	@SenderId INT = 2,
	@Id INT 


	EXECUTE  [dbo].[Messages_Insert]
							 @Message
							,@Subject
							,@RecipientId
							,@SenderId
							,@Id

	SELECT * FROM [dbo].[Messages]
*/

BEGIN

DECLARE @DateNow datetime2(7) = GETUTCDATE()

INSERT INTO [dbo].[Messages]
           ([Message]
           ,[Subject]
           ,[RecipientId]
           ,[SenderId]
           ,[DateSent])
     VALUES
           (@Message
           ,@Subject
           ,@RecipientId
           ,@SenderId
           ,@DateNow )

	 SET	@Id = SCOPE_IDENTITY()

END
GO
