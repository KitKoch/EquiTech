GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE proc [dbo].[JobSkills_Insert]
			@JobId int,
			@SkillId int,
			@ExperienceLevelId int,
			@YearsRangeStart int,
			@YearsRangeEnd int

as

/*

-- =============================================
-- Author: <Casey Roy>
-- Create date: <04/11/2023>
-- Description: <Insert proc for JobSkills Table>
-- Code Reviewer: Xizhou Zhu

-- MODIFIED BY: Casey Roy
-- MODIFIED DATE:04/12/2023
-- Code Reviewer:
-- Note:
-- =============================================


Declare @JobId int = 4,
		@SkillId int = 1,
		@ExperienceLevelId int = 2,
		@YearsRangeStart int = 2,
		@YearsRangeEnd int = 3


Execute dbo.JobSkills_Insert
		@JobId,
		@SkillId,
		@ExperienceLevelId,
		@YearsRangeStart,
		@YearsRangeEnd

*/

BEGIN

INSERT INTO	[dbo].[JobSkills]
			([JobId],
			[SkillId],
			[ExperienceLevelId],
			[YearsRangeStart],
			[YearsRangeEnd])



VALUES		(@JobId,
			@SkillId,
			@ExperienceLevelId,
			@YearsRangeStart,
			@YearsRangeEnd)

END
GO
