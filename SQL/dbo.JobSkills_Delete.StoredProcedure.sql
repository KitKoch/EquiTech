GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE proc [dbo].[JobSkills_Delete]
			@JobId int,
			@SkillId int

as

/*

Declare @JobId int = 1,
		@SkillId int = 2



Execute dbo.JobSkills_Delete
			@JobId,
			@SkillId

*/

BEGIN

DELETE FROM	[dbo].[JobSkills]

WHERE		([JobId] = @JobId AND
			[SkillId] = @SkillId)


END
GO
