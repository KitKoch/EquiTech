GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[PersonalValueRankings_Select_Summary]
as
/*
	Execute [dbo].[PersonalValueRankings_Select_Summary]
*/
BEGIN
	SELECT pv.[Id], pv.[Name], AVG(pvr.[Rank]) AS AverageRank
	FROM PersonalValues pv LEFT JOIN PersonalValueRankings pvr 
	-- using INNER JOIN will return without NULL
		ON pv.[Id] = pvr.[PersonalValueId]
	GROUP BY pv.[Name], pv.[Id]
	ORDER BY pv.[Id]
END
GO
