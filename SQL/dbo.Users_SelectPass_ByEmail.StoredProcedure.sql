GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
 
 CREATE PROC [dbo].[Users_SelectPass_ByEmail]
			@Email nvarchar(255)
AS
/*---------------- TEST CODE -----------------

	Declare @Email nvarchar(255) = 'TestInsert2@test.com'

	Execute dbo.Users_SelectPass_ByEmail
			@Email

*/

BEGIN

	SELECT	[Id]
			,[Email]
			,[Password]

	FROM	[dbo].[Users]

	WHERE	[Email] = @Email

END
GO
