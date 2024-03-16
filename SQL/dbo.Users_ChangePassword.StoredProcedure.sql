GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[Users_ChangePassword]
		@Email nvarchar(255)
		,@Token nvarchar (200)
		,@Password nvarchar(100)
	
AS
/*
Declare @Email nvarchar(255) = 'fairlyemployee@dispostable.com'
		,@Token nvarchar(200)= '008aaab2-40a9-4a73-8f7b-5204e65fc72d'
		,@Password nvarchar(100)= '123!Abcdefg'



Execute [dbo].[Users_ChangePassword] @Email
									,@Token
									,@Password


Select *
From dbo.UserTokens
Where Token = @Token

*/
		IF EXISTS (SELECT * FROM dbo.UserTokens WHERE Token = @Token) 
BEGIN
	
		UPDATE dbo.Users
		SET [Password]= @Password 
		WHERE Email = @Email 
		

		Execute [dbo].[UserTokens_Delete_ByToken] @Token
END
GO
