GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[Skills_SelectAll]
		
AS

/*******************Test Code*******************

	EXECUTE [dbo].[Skills_SelectAll]

 *******************Test Code*******************/

BEGIN

	SELECT s.[Id],
		   s.[Name],
		   i.[Id] AS IndustryId,
		   i.[Name] AS IndustryName

	FROM dbo.Skills AS s
	JOIN dbo.Industries AS i
	ON s.IndustryId = i.Id

	WHERE s.IsDeleted = 0

END
GO
