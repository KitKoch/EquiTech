GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
 CREATE PROC [dbo].[EducationRequirements_Delete]
					@Id int,
					@ModifiedBy int
					

			
AS
/*---------------- TEST CODE -----------------

	DECLARE			@Id int = 6,
					@ModifiedBy int = 10
					

	execute dbo.EducationRequirements_SelectById @Id

	EXECUTE [dbo].[EducationRequirements_Delete]  @Id, @ModifiedBy 

	execute dbo.EducationRequirements_SelectById @Id

*/

BEGIN
	
	DECLARE @DateModified datetime2(7) = GETUTCDATE();

	UPDATE [dbo].EducationRequirements
	SET				
					IsDeleted = 1
					,[ModifiedBy] = @ModifiedBy
					,[DateModified] = @DateModified
	
	WHERE Id = @Id

END
GO
