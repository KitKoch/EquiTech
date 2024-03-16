GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


 CREATE PROC [dbo].[Schools_IsVerified]
			@Id int
			,@ModifiedBy int

 AS
 /*
  DECLARE @Id int  = 3
 EXECUTE [dbo].[Schools_IsVerified]
 @Id

 EXECUTE [dbo].[Schools_SelectById]
 @Id
 */

 BEGIN

	DECLARE @DateModified datetime2(7) = GETUTCDATE()

	UPDATE [dbo].[Schools]
		
	SET 
		[isVerified] = [isVerified] ^ 1
		,[ModifiedBy] = @ModifiedBy
		,[DateModified] = @DateModified
      
	WHERE [Id] = @Id

 END


GO
