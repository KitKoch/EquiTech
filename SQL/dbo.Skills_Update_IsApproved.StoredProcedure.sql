GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[Skills_Update_IsApproved]
		
		@IsApproved bit,
		@ModifiedBy int,
		@Id int
AS
/*******************Test Code*******************

	DECLARE @Id int = 8,
			@IsApproved bit = 1,
			@ModifiedBy int = 3

	EXECUTE [dbo].[Skills_Update_IsApproved] 
			@IsApproved,
			@ModifiedBy,
			@Id
	
	EXECUTE [dbo].[Skills_Select_ById] @Id

 *******************Test Code*******************/

BEGIN
	
	DECLARE @DateModified datetime2(7) = GETUTCDATE()

	UPDATE dbo.Skills
	SET [IsApproved] = @IsApproved,
		[ModifiedBy] = @ModifiedBy,
		[DateModified] = @DateModified

	WHERE Id = @Id
END
GO
