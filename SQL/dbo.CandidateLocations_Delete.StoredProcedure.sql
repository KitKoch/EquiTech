GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE proc [dbo].[CandidateLocations_Delete]
	@UserId int
as
/*

DECLARE @UserId int = 6

EXECUTE [CandidateLocations_SelectByUserId] @UserId

EXECUTE [dbo].[CandidateLocations_Delete] @UserId

EXECUTE [CandidateLocations_SelectByUserId] @UserId

*/

BEGIN

DELETE FROM [dbo].[CandidateLocations]

      WHERE [UserId] = @UserId

END


GO
