GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[Locations_Update]
						@Id int
						,@LocationTypeId int
						,@LineOne nvarchar(255)
						,@LineTwo nvarchar(255)
						,@City nvarchar(225)
						,@Zip nvarchar(50)
						,@StateId int
						,@Latitude float
						,@Longitude float
						,@ModifiedBy int

as


/*

Select *
From dbo.Locations

Declare @Id int = 6
		,@LocationTypeId int = 1
		,@LineOne nvarchar(255) = 'UPDATED One address'
		,@LineTwo nvarchar(255) = 'UPDATED Two address'
		,@City nvarchar(225) = 'UPDATED'
		,@Zip nvarchar(50) = 'ZipCode'
		,@StateId int = 1
		,@Latitude float = 10.3932
		,@Longitude float = 75.4832
		,@ModifiedBy int = 2

Execute [dbo].[Locations_Update]
					@Id
					,@LocationTypeId 
					,@LineOne 
					,@LineTwo 
					,@City 
					,@Zip 
					,@StateId 
					,@Latitude 
					,@Longitude 
					,@ModifiedBy 

Select *
From dbo.Locations

*/


BEGIN

Declare @dateNow datetime2 = getutcdate()

UPDATE [dbo].[Locations]
   SET [LocationTypeId] = @LocationTypeId
      ,[LineOne] = @LineOne
      ,[LineTwo] = @LineTwo
      ,[City] = @City
      ,[Zip] = @Zip
      ,[StateId] = @StateId
      ,[Latitude] = @Latitude
      ,[Longitude] = @Longitude
      ,[DateModified] = @dateNow
      ,[ModifiedBy] = @ModifiedBy
 WHERE Id = @Id


END

GO
