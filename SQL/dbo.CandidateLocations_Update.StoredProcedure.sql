GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[CandidateLocations_Update]
		   (@UserId int
			,@OldLocationId int
			,@LocationId int
			,@PreferenceId int
			,@SortOrder int
			,@IsNegotiable bit)

AS

/*----------------------------------------------------------------

DECLARE @UserId int =8

DECLARE 
		,@OldLocationId int = 6
		,@LocationId int = 7
		,@PreferenceId int = 1
		,@SortOrder int = 3
		,@IsNegotiable bit = 0

EXECUTE [dbo].[CandidateLocations_SelectByUserIdV2] @UserId

EXECUTE [dbo].[CandidateLocations_Update]
		@UserId
		,@LocationId
		,@PreferenceId
		,@SortOrder
		,@IsNegotiable

EXECUTE [dbo].[CandidateLocations_SelectByUserIdV2] @UserId

*/-------------------------------------------------------------------

BEGIN
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

	IF @UserIdByPref != @UserId
	    THROW 50100, 'You do not have permission to this preference record', 1;
	IF @UserIdByLoc != @UserId
	    THROW 50100, 'You do not have permission to this Location record', 1;

	UPDATE [dbo].[CandidateLocations]

	   SET
		   [UserId] = @UserId
		  ,[LocationId] = @LocationId
		  ,[PreferenceId] = @PreferenceId
		  ,[SortOrder] = @SortOrder
		  ,[IsNegotiable] = @IsNegotiable
	 WHERE [UserId] = @UserId AND [LocationId]=@OldLocationId

END


GO
