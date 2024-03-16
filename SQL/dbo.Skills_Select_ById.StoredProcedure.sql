GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[Skills_Select_ById]
		@Id int
AS

/*******************Test Code*******************

	DECLARE @Id int = 14
	EXECUTE [dbo].[Skills_Select_ById] @Id 

 *******************Test Code*******************/

BEGIN

	SELECT s.[Id],
		   s.[Name],
		   s.[Description],
		   i.[Id] AS IndustryId,
		   i.[Name] AS IndustryName,
		   s.[IsDeleted],
		   s.[IsApproved],
		   s.[CreatedBy],
		   s.[ModifiedBy],
		   s.[DateCreated],
		   s.[DateModified]

	FROM dbo.Skills AS s
	JOIN dbo.Industries AS i
	ON s.IndustryId = i.Id

	WHERE s.Id = @Id

END
GO
