GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[Skills_Update]
		@Name nvarchar(100),
		@Description nvarchar(500),
		@IndustryId int,
		@IsDeleted bit,
		@ModifiedBy int,
		@Id int
AS
/*******************Test Code*******************

	DECLARE @Id int = 5,
			@Name nvarchar(100) = 'Analytical skills',
			@Description nvarchar(500) = 'Involves logical reasoning, analysis and conclusion',
			@IndustryId int = 5,
			@IsDeleted bit = 0,
			@ModifiedBy int = 3

	EXECUTE [dbo].[Skills_Update] 
			@Name,
			@Description,
			@IndustryId,
			@IsDeleted,
			@ModifiedBy,
			@Id

 *******************Test Code*******************/

BEGIN
	
	DECLARE @DateModified datetime2(7) = GETUTCDATE()

	UPDATE dbo.Skills
	SET [Name] = @Name,
		[Description] = @Description,
		[IndustryId] = @IndustryId,
		[IsDeleted] = @IsDeleted,
		[ModifiedBy] = @ModifiedBy,
		[DateModified] = @DateModified

	WHERE Id = @Id
END
GO
