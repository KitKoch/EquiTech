GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[Skills_Insert] 
		@Name nvarchar(100),
		@Description nvarchar(500),
		@IndustryId int,
		@CreatedBy int,
		@Id int OUTPUT

AS
/*******************Test Code*******************
	DECLARE @Id int = 0,
			@Name nvarchar(100) = 'Sales',
			@Description nvarchar(500) = 'Customer Service, meeting sales goals, and negotiation.',
			@IndustryId int = 10,
			@CreatedBy int = 6

	EXECUTE [dbo].[Skills_Insert]
			@Name,
			@Description,
			@IndustryId,
			@CreatedBy,
			@Id OUTPUT

 *******************Test Code*******************/
BEGIN
	
	INSERT INTO dbo.Skills
			(
				[Name],
				[Description],
				[IndustryId],
				[CreatedBy],
				[ModifiedBy]
			)
	VALUES
			(
				@Name,
				@Description,
				@IndustryId,
				@CreatedBy,
				@CreatedBy
			)

	SET 
			@Id = SCOPE_IDENTITY()

END
GO
