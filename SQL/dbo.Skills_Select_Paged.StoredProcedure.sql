GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[Skills_Select_Paged]
		@PageIndex int,
		@PageSize int
AS

/*******************Test Code*******************

	DECLARE @PageIndex int = 0,
			@PageSize int = 10

	EXECUTE [dbo].[Skills_Select_Paged]
		@PageIndex,
		@PageSize

		

 *******************Test Code*******************/

BEGIN
	DECLARE @Offset int = @PageIndex * @PageSize

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
		   s.[DateModified],
		   TotalCount = COUNT(1) OVER()

	FROM dbo.Skills AS s
	JOIN dbo.Industries AS i
	ON s. IndustryId = i.Id

	ORDER BY s.Id
	OFFSET @OffSet ROWS
	FETCH NEXT @PageSize ROWS ONLY

END
GO
