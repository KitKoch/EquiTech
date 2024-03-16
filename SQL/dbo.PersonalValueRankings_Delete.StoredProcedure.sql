GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc  [dbo].[PersonalValueRankings_Delete]
					@UserId int
					,@PersonalValueId int
as
/* -------------------- TEST CODE -----------------------
	Declare @UserId int = 8
			,@PersonalValueId int = 1

	Execute [dbo].[PersonalValueRankings_Select_ByUserId] @UserId

	Execute [dbo].[PersonalValueRankings_Delete] 
					@UserId
					,@PersonalValueId
	
	Execute [dbo].[PersonalValueRankings_Select_ByUserId] @UserId
*/
BEGIN

	DELETE FROM [dbo].[PersonalValueRankings]
      WHERE  [UserId] = @userId 
		AND [PersonalValueId] = @personalValueId
END


GO
