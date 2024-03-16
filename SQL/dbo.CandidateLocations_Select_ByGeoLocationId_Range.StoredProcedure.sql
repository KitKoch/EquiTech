GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROC [dbo].[CandidateLocations_Select_ByGeoLocationId_Range]
    
	@lat decimal (9,6)
    ,@lng decimal(9,6)
	,@distance int
    ,@PageIndex int
    ,@PageSize int
AS

/*
DECLARE 
	 @lat decimal = 34.0333702
	,@lng decimal = 118.4832
	,@distance int = 20
    ,@PageIndex int = 0
    ,@PageSize int = 10

EXECUTE [dbo].[CandidateLocations_Select_ByGeoLocationId_Range] 
	 @lat
	,@lng
	,@distance
    ,@PageIndex
    ,@PageSize
 
*/
BEGIN
    DECLARE @Offset int = @PageIndex * @PageSize;

    WITH allRecords AS (
		SELECT 
        ROW_NUMBER() OVER (ORDER BY cl.UserId) AS RowNum
        ,cl.UserId
		,u.FirstName
		,u.LastName
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
		,cl.PreferenceId
        ,cl.SortOrder
        ,cl.IsNegotiable
		,distance=( 3959 * acos( cos( radians(@lat) ) * cos( radians( l.Latitude ) ) * cos( radians( l.Longitude ) - radians(@lng) ) + sin( radians(@lat) ) * sin( radians(l.Latitude) ) ) )
           
		,TotalCount = COUNT(1) OVER()
		FROM [dbo].[CandidateLocations] AS cl
			inner join [dbo].[Users] AS u ON cl.UserId = u.Id
			inner join [dbo].[Locations] AS l ON cl.LocationId = l.Id
			inner join dbo.LocationTypes as lt on l.LocationTypeId = lt.Id
			inner join dbo.States as st on l.StateId = st.Id
	), filteredRecords AS (
		SELECT	*
		FROM allRecords
		WHERE distance < @distance
	)
	SELECT 
	
		 fr.UserId
		,fr.FirstName
		,fr.LastName
		,fr.Mi
		,fr.AvatarUrl
        ,fr.LocationId
		,fr.LocationTypeId
		,fr.LocationTypeName
		,fr.LineOne
		,fr.LineTwo
		,fr.City
		,fr.Zip
		,fr.StateId
		,fr.StateName
		,fr.StateCode
		,fr.Latitude
		,fr.Longitude
		,fr.DateCreated
		,fr.DateModified
		,fr.PreferenceId
        ,fr.SortOrder
        ,fr.IsNegotiable
		,TotalCount = COUNT(1) OVER()
	FROM filteredRecords fr 
    WHERE fr.distance < @distance
	ORDER BY	fr.[UserId]
	OFFSET @offset ROWS
	FETCH NEXT @PageSize ROWS ONLY
    
END

GO
