GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROC [dbo].[Messages_Update_DateRead]
	@Id INT,
	@CurrentUserId INT

AS

/*  TEST CODE

	DECLARE @Id INT = 1,
			@CurrentUserId INT = 1
	

	EXECUTE  [dbo].[Messages_Update_DateRead]
							@Id
							,@CurrentUserId

*/

BEGIN

DECLARE @DateNow datetime2(7) = GETUTCDATE()

UPDATE [dbo].[Messages]
   SET 
       [DateRead] = @DateNow
      ,[DateModified] = @DateNow
 WHERE Id = @Id AND RecipientId = @CurrentUserId AND DateRead IS NULL




END
GO
