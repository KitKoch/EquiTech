GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
 
 CREATE PROC [dbo].[Users_UpdateById]
					@UserId int
					,@Email nvarchar(255)
					,@FirstName nvarchar(100)
					,@LastName nvarchar(100)
					,@Mi nvarchar(2)
					,@AvatarUrl varchar(255)

			
AS
/*---------------- TEST CODE -----------------

	DECLARE			@UserId int = 20
					,@Email nvarchar(255) = ''
					,@FirstName nvarchar(100) = ''
					,@LastName nvarchar(100) = ''
					,@Mi nvarchar(2) = 'S'
					,@AvatarUrl varchar(255) = 'test'

	Execute dbo.Users_Select_ById @UserId

	EXECUTE [dbo].[Users_UpdateById]
					@UserId
					,@Email
					,@FirstName
					,@LastName
					,@Mi
					,@AvatarUrl

	Execute dbo.Users_Select_ById @UserId

*/

BEGIN
	
	DECLARE @DateModified datetime2(7) = GETUTCDATE();

	UPDATE [dbo].[Users]

	SET	[Email] = @Email
		,[FirstName] = @FirstName
		,[LastName] = @LastName
		,[Mi] = @Mi
		,[AvatarUrl] = @AvatarUrl
		,[DateModified] = @DateModified
	
	WHERE Id = @UserId

END
GO
