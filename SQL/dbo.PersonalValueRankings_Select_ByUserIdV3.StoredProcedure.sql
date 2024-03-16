GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[PersonalValueRankings_Select_ByUserIdV3]
					@userId int
as
/*	------------------ TEST CODE -------------------
	DECLARE @userId int = 208
	EXECUTE dbo.PersonalValueRankings_Select_ByUserIdV3
					@userId
*/
BEGIN

	SELECT	pv.[Id]
			,pv.[Name]
			,pvr.[Rank]
			,pvr.[DateCreated]
			,pvr.[DateModified]
			,pvr.[Sort]
	From dbo.Users as u inner join dbo.PersonalValueRankings as pvr
		on u.Id = pvr.UserId
		inner join dbo.PersonalValues as pv
		on pv.Id = pvr.PersonalValueId
	WHERE u.Id = @userId  
	Order By pvr.[Rank]   

END


GO
