GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[Goals_Insert]
					@Name nvarchar(100)
					,@Statement nvarchar(500)
					,@MinimumPay decimal(18,2)
					,@DesiredPay decimal(18,2)
					,@IsHourly bit
					,@Priority int
					,@YearsToGoal int
					,@CreatedBy int
					,@BatchGoalValues dbo.BatchGoalValues READONLY
					,@Id int OUTPUT

as

/* ---------- TEST CODE ----------

	DECLARE @Name nvarchar(100) = 'test Name'
			,@Statement nvarchar(500) = 'test Statement'
			,@MinimumPay decimal(18,2) = 10000.00
			,@DesiredPay decimal(18,2) = 80000.00
			,@IsHourly bit = 1
			,@Priority int = 1
			,@YearsToGoal int = 1
			,@CreatedBy int = 208
			,@BGoalValues dbo.BatchGoalValues
			,@Id int = 0

	Insert Into @BGoalValues
					([PersonalValueId])
			Values (5), (6), (10), (12)

	EXECUTE dbo.Goals_Insert
				@Name
				,@Statement
				,@MinimumPay
				,@DesiredPay
				,@IsHourly
				,@Priority
				,@YearsToGoal
				,@CreatedBy
				,@BGoalValues
				,@Id OUTPUT

	EXECUTE dbo.Goals_Select_ById @Id

*/

BEGIN

	Declare @PreferenceId int
	EXECUTE dbo.CandidatePreferences_Insert
									@CreatedBy
									,@MinimumPay
									,@DesiredPay
									,@IsHourly
									,@Id OUTPUT

	SET @PreferenceId = @Id

	INSERT INTO [dbo].[Goals]
				([Name]
				,[Statement]
				,[PreferenceId]
				,[Priority]
				,[YearsToGoal]
				,[CreatedBy])
		VALUES
				(@Name
				,@Statement
				,@PreferenceId
				,@Priority
				,@YearsToGoal
				,@CreatedBy)

	SET @Id = SCOPE_IDENTITY()

	Execute dbo.GoalValues_Insert
							@Id
							,@BatchGoalValues

END


GO
