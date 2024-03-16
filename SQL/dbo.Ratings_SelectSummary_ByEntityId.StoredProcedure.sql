GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[Ratings_SelectSummary_ByEntityId]
							@EntityTypeId int
							,@EntityId int

as

/*

Declare @EntityTypeId int = 3
		,@EntityId int = 3

Execute [dbo].[Ratings_SelectSummary_ByEntityId]
							@EntityTypeId
							,@EntityId

*/


BEGIN


SELECT AVG(Rating) as AverageRating
  FROM [dbo].[Ratings]
	Where [EntityTypeId] = @EntityTypeId
	And [EntityId] = @EntityId


END
GO
