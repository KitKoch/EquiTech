GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
 
 CREATE PROC [dbo].[Users_UpdatePassword]
					@UserId int
					,@Password varchar(100)

			
AS
/*---------------- TEST CODE -----------------

	DECLARE			@UserId int = 11
					,@Password varchar(100) = 'testPW'

	SELECT *
	FROM dbo.Users
	WHERE Id = @UserId

	EXECUTE [dbo].[Users_UpdatePassword]
					@UserId
					,@Password

	SELECT *
	FROM dbo.Users
	WHERE Id = @UserId

*/

BEGIN
	
	DECLARE @DateModified datetime2(7) = GETUTCDATE();

	UPDATE [dbo].[Users]

	SET	[Password] = @Password
		,[DateModified] = @DateModified
	
	WHERE Id = @UserId

END
GO
