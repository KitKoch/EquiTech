GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[StatusTypes_SelectAll]

AS

/*-----------------TEST CODE ---------------------

	Execute dbo.StatusTypes_SelectAll
*/

BEGIN

	SELECT	[Id]
			,[Name]

	FROM	[dbo].StatusTypes

END


GO
