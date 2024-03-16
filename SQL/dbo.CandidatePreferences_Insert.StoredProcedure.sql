GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[CandidatePreferences_Insert]
				@UserId int
			   ,@MinimumPay decimal(18,2)
			   ,@DesiredPay decimal(18,2)
			   ,@IsHourly bit
			   ,@Id int OUTPUT

as

/*

	DECLARE		@UserId int = 202
			   ,@MinimumPay decimal(18,2) = '20'
			   ,@DesiredPay decimal(18,2) = '30'
			   ,@IsHourly bit = 1
			   ,@Id int;

	EXECUTE [dbo].[CandidatePreferences_Insert]
				@UserId
			   ,@MinimumPay
			   ,@DesiredPay
			   ,@IsHourly
			   ,@Id OUTPUT
	EXECUTE [dbo].[CandidatePreferences_Select_ById] @Id

*/

BEGIN

	DECLARE @DateNow datetime2(7) = getutcdate()

INSERT INTO [dbo].[CandidatePreferences]
           ([UserId]
           ,[MinimumPay]
           ,[DesiredPay]
		   ,[IsHourly]
           ,[DateCreated]
           ,[DateModified])
     VALUES
           (@UserId
           ,@MinimumPay
           ,@DesiredPay
		   ,@IsHourly
           ,@DateNow
           ,@DateNow)
	Set @Id = SCOPE_IDENTITY()

END

GO
