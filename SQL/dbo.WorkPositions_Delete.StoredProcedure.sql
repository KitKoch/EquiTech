GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc					[dbo].[WorkPositions_Delete]
							@Id int

as
/*--TestCode







	DECLARE					@Id int = 15

	SELECT					[Id]
							,[Name]
							,[Description]
							,[WorkHistoryId]
							,[WageTypeId]
							,[JobTypeId]
							,[DateCreated]
							,[DateModified]

	FROM					[dbo].[WorkPositions]
	WHERE					Id = @Id

	EXECUTE					[dbo].[WorkPositions_Delete]
							@Id

	SELECT					[Id]
							,[Name]
							,[Description]
							,[WorkHistoryId]
							,[WageTypeId]
							,[JobTypeId]
							,[DateCreated]
							,[DateModified]

	FROM					[dbo].[WorkPositions]
	WHERE					Id = @Id







*/

BEGIN

	DELETE						
	FROM					[dbo].[WorkPositions]
							
	WHERE					Id = @Id 

END
GO
