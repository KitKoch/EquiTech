GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[UserTokens_Delete_ByToken]
				@Token varchar(200)
AS

/*-----------------TEST CODE ---------------------
	DECLARE		@Token varchar(200) = 'token string goes here'

	SELECT		[Token]
	FROM		dbo.UserTokens
	WHERE		Token = @Token

	EXECUTE dbo.UserTokens_Delete_ByToken
				@Token

	SELECT		[Token]
	FROM		dbo.UserTokens
	WHERE		Token = @Token
*/

BEGIN

	DELETE
	FROM		[dbo].UserTokens
	WHERE		Token = @Token

END


GO
