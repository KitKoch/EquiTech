GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[PersonalValueRankings_UpdateV2]
					@UserId int 
					,@BatchSort dbo.BatchPersonalValues READONLY
as 
/* -------------------- TEST CODE -----------------------
	Declare @UserId int = 8
			,@BatchSort dbo.BatchPersonalValues

	Insert into @BatchSort (PvId, Sort)
	Values (2,1),(3,2),(12,3)

	Execute [dbo].[PersonalValueRankings_Select_ByUserIdV3] @UserId

	Execute [dbo].[PersonalValueRankings_UpdateV2]
				@UserId
				,@BatchSort

	Execute [dbo].[PersonalValueRankings_Select_ByUserIdV3] @UserId
*/
BEGIN

	UPDATE [dbo].[PersonalValueRankings]
	SET [Sort] = bs.Sort 
	FROM [dbo].[PersonalValueRankings] as pvr
	INNER JOIN @BatchSort as bs 
	on pvr.PersonalValueId = bs.PvId
	WHERE pvr.UserId = @UserId

END


GO
