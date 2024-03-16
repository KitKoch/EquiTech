GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROC [dbo].[CandidatePreferences_Update]
			   @MinimumPay decimal(18,2)
			   ,@DesiredPay decimal(18,2)
			   ,@IsHourly bit
			   ,@Id int

as

/*

		DECLARE		@MinimumPay decimal(18,2) = '25'
			   ,@DesiredPay decimal(18,2) = '30'
			   ,@IsHourly bit = 1
			   ,@Id int = 5

	EXECUTE [dbo].[CandidatePreferences_Update]
			   @MinimumPay
			   ,@DesiredPay
			   ,@IsHourly
			   ,@Id
	EXECUTE [dbo].[CandidatePreferences_Select_ById] @Id

*/



BEGIN

	DECLARE @DateNow datetime2(7) = getutcdate()

UPDATE [dbo].[CandidatePreferences]
   SET
      [MinimumPay] = @MinimumPay
      ,[DesiredPay] = @DesiredPay
      ,[IsHourly] = @IsHourly
      ,[DateModified] = @DateNow
 WHERE Id = @Id
END


GO
