GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROC [dbo].[CandidatePreferences_Delete]
			   @IsDeleted bit
			   ,@Id int

as

/*

	DECLARE		@IsDeleted bit = 1
			    ,@Id int = 5

	EXECUTE [dbo].[CandidatePreferences_Delete]
			   @IsDeleted
			   ,@Id

	EXECUTE [dbo].[CandidatePreferences_Select_ById] @Id

*/



BEGIN

	DECLARE @DateNow datetime2(7) = getutcdate()

UPDATE [dbo].[CandidatePreferences]

   SET [IsDeleted] = @IsDeleted
      ,[DateModified] = @DateNow

 WHERE Id = @Id
END
GO
