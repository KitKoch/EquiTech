GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROC [dbo].[CandidateLocations_InsertV3]
           (	@LocationTypeId int
				,@LineOne nvarchar(255)
				,@LineTwo nvarchar(255)
				,@City nvarchar(225)
				,@Zip nvarchar(50)
				,@StateId int
				,@Latitude float
				,@Longitude float
				,@CreatedBy int
				,@Id int OUTPUT
            ,@PreferenceId int
            ,@SortOrder int
            ,@IsNegotiable bit
		    ,@UserId int)

AS

/* -----------------------------------------------------

	DECLARE @UserId int = 208;
	Declare @Id int = 0
	Declare @LocationTypeId int = 1
	Declare @LineOne nvarchar(255) = 'Line One address'
	Declare @LineTwo nvarchar(255) = 'Line Two address'
	Declare @City nvarchar(225) = 'City'
	Declare @Zip nvarchar(50) = 'ZipCode'
	Declare @StateId int = 1
	Declare @Latitude float = 10.3932
	Declare @Longitude float = 75.4832
	Declare @CreatedBy int = 208


	DECLARE
		 @PreferenceId int = 8
		,@SortOrder int = 1
		,@IsNegotiable bit = 1

	EXECUTE [dbo].[CandidateLocations_InsertV3]
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

		,@PreferenceId
		,@SortOrder
		,@IsNegotiable
		,@UserId 
	

	------------------------
	DECLARE @UserId int = 208;
	EXECUTE [dbo].[CandidateLocations_SelectByUserIdV2] @UserId


*/ -----------------------------------------------------------

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
	Declare @LocationId int=@Id
	DECLARE 
		@UserIdByPref INT = 
			(
			SELECT UserId 
			FROM dbo.CandidatePreferences 
			WHERE Id = @PreferenceId
			)
	DECLARE
		@UserIdByLoc INT = 
			(
			SELECT CreatedBy 
			FROM dbo.Locations 
			WHERE Id = @LocationId
			)

	IF (@UserIdByPref != @UserId)
		THROW 50100, 'You do not have permission to this preference record ', 1;
	IF @UserIdByLoc != @UserId
	    THROW 50100, 'You do not have permission to this Location record', 1;
	INSERT INTO [dbo].[CandidateLocations]
		(
		[UserId]
		,[LocationId]
		,[PreferenceId]
		,[SortOrder]         
		,[IsNegotiable]
		)
	VALUES
		(
		@UserId
		,@LocationId
		,@PreferenceId
		,@SortOrder			
		,@IsNegotiable
		)

END

GO
