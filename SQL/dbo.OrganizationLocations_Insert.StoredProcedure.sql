GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[OrganizationLocations_Insert]
	@OrganizationId int
	,@LocationId int
	,@CreatedBy int


/*--test---

Declare @OrganizationId int = 1
	,@LocationId int = 5
	,@CreatedBy int = 6


	execute [dbo].[OrganizationLocations_Insert]

	@OrganizationId
	,@LocationId
	,@CreatedBy

	select *
	from [dbo].[OrganizationLocations]


*/
as

begin



SET IDENTITY_INSERT [dbo].[OrganizationLocations] ON

INSERT INTO [dbo].[OrganizationLocations]
           ([OrganizationId]
           ,[LocationId]
           ,[CreatedBy])

     VALUES
           (@OrganizationId
           ,@LocationId
           ,@CreatedBy)

SET IDENTITY_INSERT [dbo].[OrganizationLocations] OFF

end
GO
