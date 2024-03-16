GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE proc [dbo].[ExperienceLevels_SelectAll]

as

/*

Execute dbo.ExperienceLevels_SelectAll

*/

BEGIN

SELECT	[Id],
		[Name],
		[Description]

FROM	[dbo].[ExperienceLevels]

END
GO
