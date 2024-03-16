GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
 
 CREATE PROC [dbo].[Users_UpdateStatus]
					@UserId int
					,@StatusId int

			
AS
/*---------------- TEST CODE -----------------

	DECLARE			@UserId int = 11
					,@StatusId int = 2

	Execute dbo.Users_Select_ById @UserId

	EXECUTE dbo.Users_UpdateStatus
					@UserId
					,@StatusId

	Execute dbo.Users_Select_ById @UserId

*/

BEGIN
	
	DECLARE @DateModified datetime2(7) = GETUTCDATE();

	UPDATE [dbo].[Users]
	SET				
					[StatusId] = @StatusId
					,[DateModified] = @DateModified
	
	WHERE Id = @UserId

END
GO
