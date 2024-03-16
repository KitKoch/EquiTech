GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[Goals_Select_ById]
						@Id int

AS

/* ---------- TEST CODE ----------

	DECLARE @Id int = 17;

	EXECUTE dbo.Goals_Select_ById @Id

*/

BEGIN

	SELECT g.[Id]
		   ,g.[Name]
           ,g.[Statement]
           ,cp.DesiredPay
           ,g.[Priority]
           ,g.[YearsToGoal]
           ,g.[IsCompleted]
           ,g.[IsDeleted]
           ,u.[Id]
		   ,u.[FirstName]
		   ,u.[LastName]
		   ,u.[Mi]
		   ,u.[AvatarUrl]
           ,g.[DateCreated]
           ,g.[DateModified]
		   ,GoalValues = (Select pv.[Name] as [name]
						  From dbo.GoalValues as gv join dbo.PersonalValues as pv
									On gv.PersonalValueId = pv.Id
						  Where gv.GoalId = g.Id
						  For Json Auto)
	FROM [dbo].[Goals] AS g inner join dbo.Users AS u
				ON u.Id = g.CreatedBy
				inner join dbo.CandidatePreferences AS cp
				ON cp.Id = g.PreferenceId
	WHERE g.Id = @Id

END
GO
