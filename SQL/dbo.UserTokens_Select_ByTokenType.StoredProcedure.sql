GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[UserTokens_Select_ByTokenType]
				@TokenType int

AS

/*-----------------TEST CODE ---------------------

	Declare		@TokenType int = '1'

	Execute dbo.UserTokens_Select_ByTokenType
				@TokenType

*/

BEGIN

	SELECT		[Token]
				,[UserId]
				,[TokenType]

	FROM		[dbo].[UserTokens]

	WHERE		TokenType = @TokenType

END


GO
