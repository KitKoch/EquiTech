GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[Goals_Select_ByCreatedBy]
							@CreatedBy int
							,@PageIndex int
							,@PageSize int

As

/* ---------- Test Code ----------
	
	Declare @CreatedBy int = 208
			,@PageIndex int = 0
			,@PageSize int = 10

	Execute dbo.Goals_Select_ByCreatedBy @CreatedBy
										 ,@PageIndex
										 ,@PageSize

*/

BEGIN
	
	DECLARE @Offset int = @PageIndex * @PageSize

	SELECT g.[Id]
		   ,g.[Name]
           ,g.[Statement]
		   ,cp.Id as PreferenceId
		   ,cp.MinimumPay
		   ,cp.DesiredPay
		   ,cp.IsHourly
           ,g.[Priority]
           ,g.[YearsToGoal]
           ,g.[IsCompleted]
           ,g.[IsDeleted]
           ,u.[Id] as UserId
		   ,u.[FirstName]
		   ,u.[LastName]
		   ,u.[Mi]
		   ,u.[AvatarUrl]
           ,g.[DateCreated]
           ,g.[DateModified]
		   ,GoalValues = (Select pv.Id
								 ,pv.[Name] as [name]
						  From dbo.GoalValues as gv join dbo.PersonalValues as pv
									On gv.PersonalValueId = pv.Id
						  Where gv.GoalId = g.Id
						  For Json Auto)
		   ,TotalCount = COUNT(*) OVER()
	FROM [dbo].[Goals] AS g inner join dbo.Users AS u
				ON u.Id = g.CreatedBy
				inner join dbo.CandidatePreferences AS cp
				ON cp.Id = g.PreferenceId
	WHERE g.CreatedBy = @CreatedBy and g.IsDeleted = 0
	ORDER BY IsCompleted, YearsToGoal
	Offset @Offset ROWS
	FETCH NEXT @PageSize ROWS only

END
GO
