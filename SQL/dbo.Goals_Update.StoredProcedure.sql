GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[Goals_Update]
				@Name nvarchar(100)
				,@Statement nvarchar(500)
				,@MinimumPay decimal(18,2)
				,@DesiredPay decimal(18,2)
				,@IsHourly bit
				,@PreferenceId int
				,@Priority int
				,@YearsToGoal int
				,@CreatedBy int
				,@BatchGoalValues dbo.BatchGoalValues READONLY
				,@Id int

as

/* ---------- Test Code ----------

	Declare @Name nvarchar(100) = 'test name'
			,@Statement nvarchar(500) = 'test statement'
			,@MinimumPay decimal(18,2) = 10000.00
			,@DesiredPay decimal(18,2) = 80000.00
			,@IsHourly bit = 1
			,@PreferenceId int = 25
			,@Priority int = 2
			,@YearsToGoal int = 2
			,@CreatedBy int = 208
			,@BGoalValues dbo.BatchGoalValues
			,@Id int = 50

	Insert Into @BGoalValues
						([PersonalValueId])
			Values (2), (8), (13)

	Execute dbo.Goals_Select_ById @Id

	Execute dbo.Goals_Update
						@Name
						,@Statement
						,@MinimumPay
						,@DesiredPay
						,@IsHourly
						,@PreferenceId
						,@Priority
						,@YearsToGoal
						,@CreatedBy
						,@BGoalValues
						,@Id

	EXECUTE dbo.Goals_Select_ById @Id

*/

BEGIN

	Execute [dbo].[CandidatePreferences_Update]
			   @MinimumPay
			   ,@DesiredPay
			   ,@IsHourly
			   ,@PreferenceId

	Declare @DateNow datetime2(7) = getutcdate();

	UPDATE [dbo].[Goals]
	   SET [Name] = @Name
		   ,[Statement] = @Statement
		   ,[Priority] = @Priority
		   ,[YearsToGoal] = @YearsToGoal
		   ,[DateModified] = @DateNow

	 WHERE Id = @Id AND CreatedBy = @CreatedBy

	 Execute dbo.GoalValues_Delete @Id

	 Execute dbo.GoalValues_Insert @Id
								  ,@BatchGoalValues

END


GO
