GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROC [dbo].[CandidateLocations_Select_ByLocationId_RangeV3]
    @StartLocationId int
    ,@EndLocationId int
    ,@PageIndex int
    ,@PageSize int
AS

/*
DECLARE 
	 @StartLocationId int =1
	 ,@EndLocationId int=100
    ,@PageIndex int = 0
    ,@PageSize int = 10

EXECUTE [dbo].[CandidateLocations_Select_ByLocationId_RangeV3] 
	 @StartLocationId
	,@EndLocationId
    ,@PageIndex
    ,@PageSize
 
*/
BEGIN
    DECLARE @Offset int = @PageIndex * @PageSize;
SELECT cl.[UserId]
		,u.FirstName
		,u.LastName
		,u.Mi
		,u.AvatarUrl
      ,cl.[LocationId]
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
	  ,totalCount=COUNT(1) OVER()
	  FROM [dbo].[CandidateLocations] as cl
	  inner JOIN dbo.Users as u on cl.[UserId] = u.Id
	  inner JOIN dbo.Locations as l on cl.[LocationId] = l.Id
	  inner join dbo.LocationTypes as lt on l.LocationTypeId = lt.Id
	  inner join dbo.States as st on l.StateId = st.Id
	  
	  WHERE cl.LocationId BETWEEN @StartLocationId AND @EndLocationId
	ORDER BY	cl.[UserId]
	OFFSET @offset ROWS
	FETCH NEXT @PageSize ROWS ONLY
    
END

GO
