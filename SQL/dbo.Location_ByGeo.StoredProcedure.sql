GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[Location_ByGeo]
				@Latitude float
				,@Longitude float
				,@Radius int 

as

/*
---------Radius is on Miles----------

Declare @Latitude float = 10.3932
Declare @Longitude float = 75.4832
Declare @Radius int = 20


Execute [dbo].[Location_ByGeo]
				@Latitude
				,@Longitude
				,@Radius


*/


BEGIN

SELECT [Id]
      ,[LocationTypeId]
      ,[LineOne]
      ,[LineTwo]
      ,[City]
      ,[Zip]
      ,[StateId]
      ,[Latitude]
      ,[Longitude]
      ,[DateCreated]
      ,[DateModified]
      ,[CreatedBy]
      ,[ModifiedBy]
  FROM [dbo].[Locations]
	Where (ACOS(SIN(PI()*@Latitude/180.0)*SIN(PI()*Latitude/180.0)+COS(PI()*@Latitude/180.0)*COS(PI()*Latitude/180.0)*COS(PI()*Longitude/180.0-PI()*@Longitude/180.0))*3958.7559) < @Radius   

END


GO
