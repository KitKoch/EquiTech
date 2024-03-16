GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc					[dbo].[WorkPositions_Insert]
							@Name NVARCHAR(100)
							,@Description NVARCHAR(500)
							,@WorkHistoryId INT
							,@WageTypeId INT
							,@JobTypeId INT
							,@Id INT OUTPUT

as
/*--TestCode







	SELECT TOP 100			[Id]
							,[Name]
							,[Description]
							,[WorkHistoryId]
							,[WageTypeId]
							,[JobTypeId]
							,[DateCreated]
							,[DateModified]

	FROM					[dbo].[WorkPositions]

	DECLARE					@Name NVARCHAR(100) = 'Name123'
							,@Description NVARCHAR(500) = 'Description123'
							,@WorkHistoryId INT = 3
							,@WageTypeId INT = 1
							,@JobTypeId INT = 1
							,@Id int

	EXECUTE					[dbo].[WorkPositions_Insert]
							@Name
							,@Description
							,@WorkHistoryId
							,@WageTypeId
							,@JobTypeId
							,@Id OUTPUT

	SELECT TOP 100			[Id]
							,[Name]
							,[Description]
							,[WorkHistoryId]
							,[WageTypeId]
							,[JobTypeId]
							,[DateCreated]
							,[DateModified]

	FROM					[dbo].[WorkPositions]







*/

BEGIN


	INSERT INTO				[dbo].[WorkPositions]
							([Name]
							,[Description]
							,[WorkHistoryId]
							,[WageTypeId]
							,[JobTypeId])

	VALUES					(@Name
							,@Description
							,@WorkHistoryId
							,@WageTypeId
							,@JobTypeId)

	SET						@Id = SCOPE_IDENTITY()


END
GO
