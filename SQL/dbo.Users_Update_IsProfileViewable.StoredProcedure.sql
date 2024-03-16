GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
 
 CREATE PROC [dbo].[Users_Update_IsProfileViewable]
					@UserId int
					,@IsProfileViewable bit

			
AS
/*---------------- TEST CODE -----------------

	DECLARE			@UserId int = 11
					,@IsProfileViewable bit = 0

	Execute dbo.Users_Select_ById @UserId

	EXECUTE dbo.Users_Update_IsProfileViewable
					@UserId
					,@IsProfileViewable

	Execute dbo.Users_Select_ById @UserId

*/

BEGIN
	
	DECLARE @DateModified datetime2(7) = GETUTCDATE();

	UPDATE [dbo].[Users]
	SET				
					[IsProfileViewable] = @IsProfileViewable
					,[DateModified] = @DateModified
	
	WHERE Id = @UserId

END
GO
