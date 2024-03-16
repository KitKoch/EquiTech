GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[Goals_FilterBy_DesiredPay]
							@IsCompleted bit
							,@MinimumPay decimal(18, 2)
							,@MaximumPay decimal(18, 2)
							,@PageIndex int
							,@PageSize int
							,@Query nvarchar(50)

AS

/* ---------- Test Code ----------

	Declare @IsCompleted bit = null
			,@MinimumPay decimal(18, 2) = 0
			,@MaximumPay decimal(18, 2) = 200000
			,@PageIndex int = 0
			,@PageSize int = 15
			,@Query nvarchar(50) = ''

	Execute dbo.Goals_FilterBy_DesiredPay
							@IsCompleted
							,@MinimumPay
							,@MaximumPay
							,@PageIndex
							,@PageSize
							,@Query

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
				inner join dbo.UserRoles as ur
				ON g.CreatedBy = ur.UserId
	WHERE g.IsDeleted = 0 AND ur.RoleId = 5
		  AND (@IsCompleted is null OR g.IsCompleted = @IsCompleted)
		  AND (@MinimumPay is null OR cp.DesiredPay >= @MinimumPay)
		  AND (@MaximumPay is null OR cp.DesiredPay <= @MaximumPay)
		  AND (u.FirstName LIKE '%' + @Query + '%' OR u.LastName LIKE '%' + @Query + '%')
	ORDER BY IsCompleted, YearsToGoal
	Offset @Offset ROWS
	FETCH NEXT @PageSize ROWS only

END
GO
