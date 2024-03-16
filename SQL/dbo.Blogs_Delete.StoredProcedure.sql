GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

 CREATE PROC [dbo].[Blogs_Delete]
					@Id int
					

			
AS
/*---------------- TEST CODE -----------------

	DECLARE			@Id int = 6
					
	EXECUTE dbo.Blogs_SelectById @Id


	EXECUTE dbo.Blogs_Delete  @Id

	EXECUTE dbo.Blogs_SelectById @Id

*/

BEGIN
	
	DECLARE @DateModified datetime2(7) = GETUTCDATE();

	UPDATE [dbo].Blogs
	SET				
					[IsDeleted] = 1
					,[DateModified] = @DateModified
	
	WHERE Id = @Id

END
GO
