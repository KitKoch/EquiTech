GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc					[dbo].[WorkPositions_Update]
							@Id INT
							,@Name NVARCHAR(100)
							,@Description NVARCHAR(500)
							,@WorkHistoryId INT
							,@WageTypeId INT
							,@JobTypeId INT

as
/*--TestCode







	DECLARE					@Name NVARCHAR(100) = 'Name12345'
							,@Description NVARCHAR(500) = 'Description1234'
							,@WorkHistoryId INT = 3
							,@WageTypeId INT = 1
							,@JobTypeId INT = 1
							,@Id int = 5

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

	EXECUTE					[dbo].[WorkPositions_Update]
							@Id
							,@Name
							,@Description
							,@WorkHistoryId
							,@WageTypeId
							,@JobTypeId

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


	DECLARE					@DateModified datetime2(7) = getutcdate()

	UPDATE					[dbo].[WorkPositions]

	SET						[Name] = @Name
							,[Description] = @Description
							,[WorkHistoryId] = @WorkHistoryId
							,[WageTypeId] = @WageTypeId
							,[JobTypeId] = @JobTypeId
							,[DateModified] = @DateModified

	WHERE					Id = @Id


END
GO
