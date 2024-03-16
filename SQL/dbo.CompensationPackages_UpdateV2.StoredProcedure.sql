GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE proc [dbo].[CompensationPackages_UpdateV2]
	@OrgId  int,
	@Name nvarchar(100),
	@Description nvarchar(500),
	@ModifiedBy int,
	@CompPackageId int
as

/* ----- Test Code -----
	
	Declare @CompPackageId int = 11,

	@OrgId int = 1,
	@Name nvarchar(100) = 'Junior Developer Package',
	@Description nvarchar(500) = '401k, $85k base salart',
	@ModifiedBy int = 7
	
	Execute [dbo].[[CompensationPackages_UpdateV2]
	@OrgId,
	@Name,
	@Description,
	@ModifiedBy,
	@CompPackageId
	

	Select * 
	from dbo.CompensationPackages
	Order By [OrgId]
	Where Id = @CompPackageId	

*/

BEGIN
	Declare @CurrentTime datetime2 = GETUTCDATE()

	UPDATE [dbo].[CompensationPackages]
	SET

	[Name] = @Name,
	[Description] = @Description,
	[ModifiedBy] = @ModifiedBy,
	[DateModified] = @CurrentTime

	Where [Id] = @CompPackageId and [OrgId] = @OrgId  
	 

END
GO
