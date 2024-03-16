GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

 CREATE PROC [dbo].[Users_Confirm]
					@UserId int

			
AS
/*---------------- TEST CODE -----------------

	DECLARE			@UserId int = 11

	Execute dbo.Users_Select_ById @UserId

	EXECUTE dbo.Users_Confirm
					@UserId

	
	Execute dbo.Users_Select_ById @UserId

*/

BEGIN
	
	DECLARE @DateModified datetime2(7) = GETUTCDATE();

	UPDATE [dbo].[Users]
	SET				
					[IsConfirmed] = 1
					,[DateModified] = @DateModified
	
	WHERE Id = @UserId

END
GO
