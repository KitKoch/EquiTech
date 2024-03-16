GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[GoalValues_Insert]
							@Id int
							,@BatchGoalValues dbo.BatchGoalValues READONLY

AS
/* ---------- Test Code ----------

	Declare @Id int = 15
			,@BGoalValues dbo.BatchGoalValues

	Insert Into @BGoalValues
					([PersonalValueId])
			Values (5), (1), (2)

	Select *
	From @BGoalValues

	Execute dbo.GoalValues_Insert @Id
								  ,@BGoalValues

	Select *
	From dbo.GoalValues
	Where GoalId = @Id

*/

BEGIN

	INSERT INTO dbo.GoalValues
				([GoalId]
				 ,[PersonalValueId])
	SELECT @Id
		   ,bgv.[PersonalValueId]
	FROM @BatchGoalValues as bgv
	WHERE NOT EXISTS( SELECT GoalId
					  FROM dbo.GoalValues
					  WHERE GoalId = @Id)

END
GO
