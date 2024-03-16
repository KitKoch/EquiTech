GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
 
 CREATE PROC [dbo].[Users_Select_ById]
			@Id int
AS
/*---------------- TEST CODE -----------------

	Declare @Id int = '11'

	Execute dbo.Users_Select_ById
			@Id

*/

BEGIN

	SELECT	[Id]
			,[FirstName]
			,[LastName]
			,[Mi]
			,[AvatarUrl]
			,[Email]
			,[IsConfirmed]
			,[StatusId]
			,[DateCreated]
			,[DateModified]
			,[IsProfileViewable]

	FROM	[dbo].[Users]

	WHERE	[Id] = @Id

END
GO
