GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[Locations_SelectAllEveryLoc]

as

/*


Execute [dbo].[Locations_SelectAllEveryLoc] 

*/


BEGIN

  SELECT l.[Id]
	  ,lt.Id  as LocationTypeId
	  ,lt.Name as LocationTypeName
      ,[LineOne]
      ,[LineTwo]
      ,[City]
      ,[Zip]
      ,[StateId]
	  ,st.Name as StateName
	  ,st.Code as StateCode
      ,[Latitude]
      ,[Longitude]
      ,l.[DateCreated]
      ,l.[DateModified]

  FROM [dbo].[Locations] as l inner join dbo.LocationTypes as lt
				on l.LocationTypeId = lt.Id
				inner join dbo.States as st on l.StateId = st.Id
	Order by l.Id

END
GO
