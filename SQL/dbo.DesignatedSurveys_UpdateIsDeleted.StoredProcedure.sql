GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[DesignatedSurveys_UpdateIsDeleted]
			@ModifiedBy int
			,@Id int 
AS 

/*
		DECLARE @Id int = 13
		       ,@ModifiedBy int = 3

		EXECUTE dbo.DesignatedSurveys_UpdateIsDeleted
				@ModifiedBy
				,@Id 

		SELECT * 
		FROM dbo.DesignatedSurveys
*/

BEGIN 
		DECLARE @DateModified datetime2(7) = GETUTCDATE()

		UPDATE dbo.DesignatedSurveys
		
		SET   [IsDeleted] = IsDeleted ^ 1
			 ,[ModifiedBy] = @ModifiedBy
		     ,[DateModified] = @DateModified
		
		WHERE [Id] = @Id

END 
GO
