GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROC [dbo].[CandidatePreferences_Select_ByUserId]
			   @UserId int
			   

as

/*

	DECLARE	@UserId int = 202

	EXECUTE [dbo].[CandidatePreferences_Select_ByUserId]
			   @UserId

*/

BEGIN

SELECT cp.[Id]
      ,cp.[UserId]
	  ,u.FirstName
	  ,u.LastName
	  ,u.Mi
	  ,u.AvatarUrl
      ,cp.[MinimumPay]
      ,cp.[DesiredPay]
      ,cp.[IsHourly]
      ,cp.[IsDeleted]
      ,cp.[DateCreated]
      ,cp.[DateModified]

  FROM [dbo].[CandidatePreferences] as cp 
		INNER JOIN dbo.Users as u on cp.UserId = u.Id
  Where cp.UserId = @UserId
  AND cp.IsDeleted = 0

END


GO
