GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE proc [dbo].[JobSkills_Select_ByJobId]
			@JobId int

as

/*

Declare @JobId int = 1



Execute dbo.JobSkills_Select_ByJobId
			@JobId

*/

BEGIN

SELECT		[JobId],
			[SkillId],
			[ExperienceLevelId],
			[YearsRangeStart],
			[YearsRangeEnd],
			[DateCreated],
			[DateModified]


FROM		[dbo].[JobSkills]

WHERE		[JobId] = @JobId



END
GO
