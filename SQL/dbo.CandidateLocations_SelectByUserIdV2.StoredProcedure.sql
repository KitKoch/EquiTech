GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROC [dbo].[CandidateLocations_SelectByUserIdV2]
			@UserId int
AS

/*

Declare @UserId int = 208

Execute [dbo].[CandidateLocations_SelectByUserIdV2]
	@UserId

*/

BEGIN

SELECT cl.[UserId]
	  ,u.[FirstName]
	  ,u.[LastName]
	  ,u.Mi
	  ,u.AvatarUrl
	  ,cl.LocationId
	  ,lt.[Id]  as LocationTypeId
	  ,lt.[Name] as LocationTypeName
      ,l.[LineOne]
      ,l.[LineTwo]
      ,l.[City]
      ,l.[Zip]
      ,l.[StateId]
	  ,st.[Name] as StateName
	  ,st.[Code] as StateCode
      ,l.[Latitude]
      ,l.[Longitude]
      ,l.[DateCreated]
      ,l.[DateModified]
      ,cl.[PreferenceId]
      ,cl.[SortOrder]
      ,cl.[IsNegotiable]
  FROM dbo.CandidateLocations as cl 
		inner join dbo.Users as u
		on cl.UserId = u.Id
					inner join dbo.Locations as l
		on cl.LocationId = l.Id
		inner join dbo.LocationTypes as lt
				on l.LocationTypeId = lt.Id
		inner join dbo.States as st on l.StateId = st.Id
	WHERE UserId = @UserId
	Order By cl.SortOrder asc ,	l.[DateCreated] desc

END


GO
