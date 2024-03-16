GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc					[dbo].[WorkPositions_Select_ByWorkHistoryId]
							@WorkHistoryId INT

as
/*--TestCode


	DECLARE					@WorkHistoryId int = 3

	EXECUTE					[dbo].[WorkPositions_Select_ByWorkHistoryId]
							@WorkHistoryId


*/

BEGIN


	SELECT					wp.[Id]
							,wp.[Name]
							,wp.[Description]
							,wp.[WorkHistoryId]
							,wp.[WageTypeId]
							,jwt.[Name] as WageType
							,wp.[JobTypeId]
							,jt.[Name] as JobType
							,wp.[DateCreated]
							,wp.[DateModified]

	FROM					dbo.[WorkPositions] as wp

								INNER JOIN dbo.[JobWageTypes] as jwt
								ON jwt.[Id] = wp.[WageTypeId]

								INNER JOIN dbo.[JobTypes] as jt
								ON jt.[Id] = wp.[JobTypeId]

	WHERE					wp.[WorkHistoryId] = @WorkHistoryId

	ORDER BY				wp.[DateCreated] DESC


END
GO
