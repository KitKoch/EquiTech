GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[Roles_SelectAll]

AS

/*-----------------TEST CODE ---------------------

	EXECUTE dbo.Roles_SelectAll
*/

BEGIN

	SELECT	[Id]
			,[Name]

	FROM [dbo].Roles

END


GO
