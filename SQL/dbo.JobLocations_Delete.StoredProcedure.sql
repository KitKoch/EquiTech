GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[JobLocations_Delete]

		@JobId int
		,@LocationId int


/*--test---

	select *
	from [dbo].[JobLocations]

	declare ,@JobId int = 5
	,@LocationId int = 5

	execute [dbo].[JobLocations_Delete]
	
	@JobId
	,@LocationId

	select *
	from [dbo].[JobLocations]

*/
as

begin


DELETE
FROM [dbo].[JobLocations]
WHERE [JobId] = @JobId AND [LocationId] = @LocationId 



end
GO
