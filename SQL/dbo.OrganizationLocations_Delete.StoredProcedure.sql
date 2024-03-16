GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[OrganizationLocations_Delete]

		@OrganizationId int 
		,@LocationId int


/*--test---

	select *
	from [dbo].[OrganizationLocations]


	declare @OrganizationId int = 1
	,@LocationId int = 5

	execute [dbo].[OrganizationLocations_Delete]
	
	@OrganizationId
	,@LocationId

	select *
	from [dbo].[OrganizationLocations]


*/
as

begin


DELETE
FROM [dbo].[OrganizationLocations]
WHERE [OrganizationId] = @OrganizationId AND [LocationId] = @LocationId 



end
GO
