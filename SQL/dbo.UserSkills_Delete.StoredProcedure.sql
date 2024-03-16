GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC	[dbo].[UserSkills_Delete]
					@UserId int
					,@SkillId int

AS
/*

DECLARE		@UserId int = 205
			,@SkillId int = 5

EXECUTE		[dbo].[UserSkills_Delete]
						@UserId
						,@SkillId
*/

BEGIN

	DELETE						
	FROM [dbo].[UserSkills]
							
	WHERE UserId = @UserId 
	AND SkillId = @SkillId

END
GO
