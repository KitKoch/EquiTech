GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROC [dbo].[CandidateLocations_SelectByIdV2]
			@LocationId int
AS

/*

DECLARE @LocationId int = 5

EXECUTE dbo.CandidateLocations_SelectByIdV2 @LocationId

*/

BEGIN

SELECT c.[UserId]
		,u.FirstName
		,u.LastName
		,u.Mi
		,u.AvatarUrl
      ,c.[LocationId]
	  ,l.City
	  ,l.LineOne
	  ,l.LineTwo
	  ,l.Zip
      ,c.[PreferenceId]
      ,c.[DateCreated]
      ,c.[IsNegotiable]
	  FROM [dbo].[CandidateLocations] as c
	  inner JOIN dbo.Locations as l on c.[LocationId] = l.Id
	  inner JOIN dbo.Users as u on c.[UserId] = u.Id
	  WHERE c.LocationId = @LocationId

END


GO
