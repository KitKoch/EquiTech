GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[UserTokens_InsertV2]
				@Token varchar(200)
				,@Email nvarchar(200)
				,@TokenType int

AS

/*-----------------TEST CODE ---------------------

	DECLARE		@Token varchar(200) = 'token string goes here'
				,@UserId int = '3'
				,@TokenType int = '1'

	EXECUTE	dbo.UserTokens_InsertV2
				@Token
				,@UserId
				,@TokenType

	SELECT	[Token] 
	FROM dbo.UserTokens

*/

BEGIN

	Declare @UserId int

	Select @UserId = [Id]
	From dbo.Users
	Where [Email] = @Email

	INSERT INTO [dbo].[UserTokens]
				([Token]
				,[UserId]
				,[TokenType])
     VALUES
			   (@Token
			   ,@UserId
			   ,@TokenType)

END
GO
