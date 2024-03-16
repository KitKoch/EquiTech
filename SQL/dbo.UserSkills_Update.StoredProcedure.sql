GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[UserSkills_Update]
			@UserId int
			,@SkillId int
			,@ExperienceLevelId int
			,@Years int
			,@Months int
			

AS

BEGIN

DECLARE @DateModified datetime2(7) = GETUTCDATE()

UPDATE [dbo].[UserSkills]


   SET [UserId] = @UserId
      ,[SkillId] = @SkillId
      ,[ExperienceLevelId] = @ExperienceLevelId
      ,[Years] = @Years
      ,[Months] = @Months
      ,[DateModified] = @DateModified

 WHERE  UserId = @UserId AND
		SkillId = @SkillId
		

 END


GO
