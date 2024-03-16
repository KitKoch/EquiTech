GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[Locations_Insert]
				@LocationTypeId int
				,@LineOne nvarchar(255)
				,@LineTwo nvarchar(255)
				,@City nvarchar(225)
				,@Zip nvarchar(50)
				,@StateId int
				,@Latitude float
				,@Longitude float
				,@CreatedBy int
				,@Id int OUTPUT

as

/*

Select *
From dbo.Locations

Declare @Id int = 0
Declare @LocationTypeId int = 1
Declare @LineOne nvarchar(255) = 'Line One address'
Declare @LineTwo nvarchar(255) = 'Line Two address'
Declare @City nvarchar(225) = 'City'
Declare @Zip nvarchar(50) = 'ZipCode'
Declare @StateId int = 1
Declare @Latitude float = 10.3932
Declare @Longitude float = 75.4832
Declare @CreatedBy int = 1

Execute [dbo].[Locations_Insert]
					@LocationTypeId
					,@LineOne 
					,@LineTwo 
					,@City 
					,@Zip
					,@StateId 
					,@Latitude 
					,@Longitude 
					,@CreatedBy
					,@Id

Select *
From dbo.Locations


*/


BEGIN


INSERT INTO [dbo].[Locations]
           ([LocationTypeId]
           ,[LineOne]
           ,[LineTwo]
           ,[City]
           ,[Zip]
           ,[StateId]
           ,[Latitude]
           ,[Longitude]
           ,[CreatedBy]
           ,[ModifiedBy])
     VALUES
           (
		   @LocationTypeId
           ,@LineOne
           ,@LineTwo 
           ,@City
           ,@Zip
           ,@StateId
           ,@Latitude
           ,@Longitude
           ,@CreatedBy
           ,@CreatedBy
		   )
		   SET @Id = SCOPE_IDENTITY();


END
GO
