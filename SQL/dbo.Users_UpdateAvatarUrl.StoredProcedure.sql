GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
 
 CREATE PROC [dbo].[Users_UpdateAvatarUrl]
					@UserId int
					,@AvatarUrl varchar(255)

			
AS
/*---------------- TEST CODE -----------------

	DECLARE			@UserId int = 11
					,@AvatarUrl varchar(255) =
	Execute dbo.Users_Select_ById @UserId

	EXECUTE [dbo].[Users_UpdateAvatarUrl]
					@UserId
					,@AvatarUrl

	Execute dbo.Users_Select_ById @UserId

*/

BEGIN
	
	DECLARE @DateModified datetime2(7) = GETUTCDATE();

	UPDATE [dbo].[Users]

	SET	[AvatarUrl] = @AvatarUrl
		,[DateModified] = @DateModified
	
	WHERE Id = @UserId

END
GO
