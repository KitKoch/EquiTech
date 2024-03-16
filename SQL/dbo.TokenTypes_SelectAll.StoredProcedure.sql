GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROC [dbo].[TokenTypes_SelectAll]

AS

/*-----------------TEST CODE ---------------------

	EXECUTE dbo.TokenTypes_SelectAll
*/

BEGIN

	SELECT	[Id]
			,[Name]

	FROM	[dbo].[TokenTypes]

END


GO
